import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import rifActions from '../../../actions';
import LuminoChannelItem from '../../../components/luminoChannelItem';
import OpenChannel from '../../../components/lumino/open-channel';
import {GenericTable} from '../../../components';
import {pageNames} from '../../names';
import {lumino} from '../../../../../../app/scripts/controllers/rif/constants';
import {getStatus} from '../../../utils/utils';
import {withTranslation} from "react-i18next";

const styles = {
  myLuminoChannels: {
    title: 'n-table-title',
    table: 'n-table',
    tbodyTd: 'n-table-td',
    pagination: {
      body: 'n-table-pagination',
      buttonBack: 'n-table-pagination-back',
      indexes: '',
      activePageButton: 'n-table-pagination-active',
      inactivePageButton: 'n-table-pagination-inactive',
      buttonNext: 'n-table-pagination-next',
    },
  },
}

class LuminoNetworkDetails extends Component {

  static propTypes = {
    networkSymbol: PropTypes.string,
    tokenNetwork: PropTypes.string,
    getUserChannels: PropTypes.func,
    getNetworkData: PropTypes.func,
    tokenAddress: PropTypes.string,
    networkName: PropTypes.string,
    showChannelDetails: PropTypes.func,
    startListening: PropTypes.func,
    t: PropTypes.func
  }

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      networkData: {
        channels: 0,
        nodes: 0,
      },
      userChannels: [],
    }
    this.startListeningToEvents();
  }

  startListeningToEvents () {
    this.props.startListening([lumino.callbacks.COMPLETED_PAYMENT, lumino.callbacks.DEPOSIT_CHANNEL, lumino.callbacks.OPEN_CHANNEL], (result) => {
      this.reloadChannelsData();
      this.startListeningToEvents();
    });
  }

  reloadChannelsData = async () => {
    const {getUserChannels, tokenAddress, getNetworkData} = this.props;
    const userChannels = await getUserChannels(tokenAddress);
    if (userChannels && userChannels.length) this.setState({userChannels, loading: false})
    const networkData = await getNetworkData(tokenAddress);
    if (networkData) this.setState({networkData})
  }


  async componentDidMount () {
    await this.reloadChannelsData();
    // TODO: Run again a function to resolve addresses to RNS domains
    return this.setState({loading: false})
  }

  getChannelItems = channels => {
    const {networkSymbol} = this.props;
    return channels.map(c => {
      return {
        content: <LuminoChannelItem key={c.channel_identifier} partnerAddress={c.partner_address}
                                    balance={c.offChainBalance} isOpening={c.isOpening}
                                    state={getStatus(c.sdk_status)} tokenSymbol={networkSymbol}
                                    onClick={() => this.props.showChannelDetails({
                                      channel: c,
                                    })}/>,
      };
    });
  }

  render () {
    const {networkSymbol, networkName, tokenNetwork, tokenAddress, t} = this.props;
    const {userChannels, loading, networkData} = this.state;
    const channelItems = this.getChannelItems(userChannels);
    const columns = [{
      Header: 'Content',
      accessor: 'content',
    }];
    return (
      <div className="body lumino-network-detail-container">
        <div className="d-flex align-items-center">
          <div className="network-detail__name">{t('{{networkSymbol}} Network', {networkSymbol})}</div>
        </div>
        <div className="row-data-container mb-4">
          <span className="lumino-text-symbol mr-1">
            {networkSymbol}
          </span>
          <div className="d-flex align-items-center">
            <img height={15} width={15} src="images/rif/node.svg"/>
            <span className="lumino-text-data">{networkData.nodes} <small>{t('nodes')}</small></span>
          </div>
          <div className="d-flex align-items-center">
            <img height={15} width={15} src="images/rif/channels.svg"/>
            <span className="lumino-text-data">{networkData.channels} <small>{t('channels')}</small></span>
          </div>

        </div>
        {loading && <div>{t('Loading data')}</div>}
        {!loading && <div>
          {!!userChannels.length &&
          <GenericTable
            title={t('My channels in {{networkSymbol}} network', {networkSymbol})}
            classes={styles.myLuminoChannels}
            columns={columns}
            data={channelItems}
            paginationSize={3}/>
          }
          {!userChannels.length && <div>
            <div>
              {t('No channels yet')}
            </div>
            <div>{t('Add a channel to join the {{networkSymbol}} network', {networkSymbol})}</div>
          </div>
          }
        </div>
        }
        <OpenChannel
          tokenAddress={tokenAddress}
          tokenNetworkAddress={tokenNetwork}
          tokenName={networkName}
          reloadChannels={this.reloadChannelsData}
          afterChannelCreated={this.reloadChannelsData}
          afterDepositCreated={this.reloadChannelsData}
          tokenSymbol={networkSymbol}/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  // params is the params value or object passed to rifActions.navigateTo('pageName', params)
  const params = state.appState.currentView.params;
  return {
    currentAddress: state.metamask.selectedAddress.toLowerCase(),
    networkSymbol: params.networkSymbol,
    tokenNetwork: params.tokenNetwork,
    tokenAddress: params.tokenAddress,
    networkName: params.networkName,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showChannelDetails: (params) => dispatch(rifActions.navigateTo(pageNames.rns.luminoChannels, {
      ...params,
      tabOptions: {
        showSearchbar: false,
        showBack: true,
      },
    })),
    getUserChannels: tokenAddress => dispatch(rifActions.getUserChannelsInNetwork(tokenAddress)),
    getNetworkData: tokenAddress => dispatch(rifActions.getLuminoNetworkData(tokenAddress)),
    startListening: (callbackNames, callbackHandler) => dispatch(rifActions.listenCallbacks(callbackNames, callbackHandler)),
  }
}

export default withTranslation('translations')(connect(mapStateToProps, mapDispatchToProps)(LuminoNetworkDetails))
