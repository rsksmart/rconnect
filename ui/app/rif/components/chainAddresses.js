import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import rifActions from '../actions';
import {CustomButton, GenericTable} from './index';
import {getChainAddressByChainAddress} from '../utils/utils';
import {DEFAULT_ICON, GET_RESOLVERS, SVG_PLUS} from '../constants';
import ItemWithActions from './item-with-actions';
import InputWithSubmit from './InputWithSubmit';
import rifConfig from '../../../../rif.config';
import AddNewChainAddressToResolver
  from '../pages/domainsDetailPage/domainDetailActive/addNewTokenNetworkAddress/addNewChainAddressToResolver';
import {SLIP_ADDRESSES} from '../constants/slipAddresses';

class ChainAddresses extends Component {

  static propTypes = {
    domainName: PropTypes.string.isRequired,
    setChainAddressForResolver: PropTypes.func.isRequired,
    pageName: PropTypes.string.isRequired,
    showThis: PropTypes.func.isRequired,
    redirectParams: PropTypes.any.isRequired,
    isOwner: PropTypes.bool.isRequired,
    selectedResolverAddress: PropTypes.string,
    getChainAddresses: PropTypes.func,
    newChainAddresses: PropTypes.array,
    waitForListener: PropTypes.func,
    showTransactionConfirmPage: PropTypes.func,
    paginationSize: PropTypes.number,
    classes: PropTypes.any,
  }

  constructor (props) {
    super(props);
    const resolvers = Object.assign([], GET_RESOLVERS());
    const slipChainAddresses = Object.assign([], SLIP_ADDRESSES);
    this.state = {
      chainAddresses: [],
      resolvers: resolvers,
      slipChainAddresses: slipChainAddresses,
      selectedChainAddress: slipChainAddresses[0].chain,
      insertedAddress: '',
      addChainAddress: false,
    };
  }

  componentDidMount () {;
    this.loadChainAddresses();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.domainName !== this.props.domainName) {
      this.loadChainAddresses();
    } else if (prevProps.newChainAddresses !== this.props.newChainAddresses && this.props.newChainAddresses.length > 0) {
      this.setState({chainAddresses: this.props.newChainAddresses});
    }
  }

  async loadChainAddresses () {
    if (this.state.resolvers.find(resolver => resolver.address === this.props.selectedResolverAddress)) {
      const chainAddresses = await this.props.getChainAddresses(this.props.domainName);
      this.setState({chainAddresses: chainAddresses});
    } else if (rifConfig.mocksEnabled) {
      const chainAddresses = await this.props.getChainAddresses(this.props.domainName);
      this.setState({chainAddresses: chainAddresses});
    }
  }

  convertChainAddressesToTableData () {
    const { isOwner, classes } = this.props;
    return this.state.chainAddresses.map((chainAddress) => {
      const address = getChainAddressByChainAddress(chainAddress.chain);
      const icon = address.icon ? address.icon : DEFAULT_ICON;
      const item = <ItemWithActions contentClasses={classes.content} actionClasses={classes.contentActions} enableEdit={isOwner} enableDelete={isOwner} text={chainAddress.address} leftIcon={icon} onDeleteClick={this.onDeleteClick.bind(this, chainAddress.chain)}>
        <InputWithSubmit hiddenValue={chainAddress.chain} submit={this.onChangeSubmit} />
      </ItemWithActions>
      return {
        content: item,
      };
    });
  }

  onChangeSubmit = (address, selectedChainAddress) => {
    this.addAddress(address, selectedChainAddress);
  }

  onDeleteClick = (selectedChainAddress) => {
    this.addAddress(null, selectedChainAddress);
  }

  updateChainAddress = (selectedOption) => {
    this.setState({ selectedChainAddress: selectedOption });
  }

  updateAddress = (address) => {
    this.setState({ insertedAddress: address });
  }

  async addAddress (address = null, chainAddress = null) {
    const insertedAddress = address || this.state.insertedAddress;
    const selectedChainAddress = chainAddress || this.state.selectedChainAddress;
    const transactionListenerId = await this.props.setChainAddressForResolver(this.props.domainName, selectedChainAddress, insertedAddress);
    this.props.waitForListener(transactionListenerId)
      .then(async (transactionReceipt) => {
        if (this.state.resolvers.find(resolver => resolver.address === this.props.selectedResolverAddress)) {
          const chainAddresses = await this.props.getChainAddresses(this.props.domainName);
          this.props.showThis(
            this.props.pageName,
            {
              ...this.props.redirectParams,
              newChainAddresses: chainAddresses,
          });
        }
      });
    this.props.showTransactionConfirmPage({
      action: () => {
        this.props.showThis(
          this.props.pageName,
          this.props.redirectParams)
      },
    });
  }

  showAddChainAddress = () => {
    this.setState({addChainAddress: !this.state.addChainAddress})
  }

  render () {
    const { isOwner, selectedResolverAddress, pageName, paginationSize, classes } = this.props;
    const { resolvers } = this.state;
    const data = this.convertChainAddressesToTableData();
    return (
      <div>
        {
          data.length > 0 &&
          <div>
            <GenericTable
              title={'Addresses'}
              columns={[
                {
                  Header: 'Content',
                  accessor: 'content',
                },
              ]}
              data={data}
              paginationSize={paginationSize || 3}
              classes={classes}
            />
          </div>
        }
        {
          data.length === 0 &&
          <div>
            <span>Addresses</span>
            <span>No addresses found</span>
          </div>
        }
        {(isOwner && resolvers.find(resolver => resolver.address === selectedResolverAddress)) &&
        <div>
          <CustomButton
            svgIcon={SVG_PLUS}
            text={'Add Address'}
            onClick={() => this.showAddChainAddress()}
            className={
              {
                button: classes.customButton.button,
                icon: classes.customButton.icon,
                text: classes.customButton.text,
              }
            }
          />
          {this.state.addChainAddress &&
          <AddNewChainAddressToResolver
            updateChainAddress={this.updateChainAddress.bind(this)}
            updateAddress={this.updateAddress.bind(this)}
            slipChainAddresses={this.state.slipChainAddresses}
            confirmCallback={this.addAddress.bind(this)}
            pageName={pageName}
          />
          }
        </div>
        }
      </div>
    );
  }
}
function mapStateToProps (state) {
  const params = state.appState.currentView.params;
  return {
    ...params,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getChainAddresses: (domainName) => dispatch(rifActions.getChainAddresses(domainName)),
    setChainAddressForResolver: (domainName, chain, chainAddress) => dispatch(rifActions.setChainAddressForResolver(domainName, chain, chainAddress)),
    showThis: (pageName, props) => dispatch(rifActions.navigateTo(pageName, props)),
    waitForListener: (transactionListenerId) => dispatch(rifActions.waitForTransactionListener(transactionListenerId)),
    showTransactionConfirmPage: (afterApproval) => dispatch(rifActions.goToConfirmPageForLastTransaction(afterApproval)),
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(ChainAddresses);
