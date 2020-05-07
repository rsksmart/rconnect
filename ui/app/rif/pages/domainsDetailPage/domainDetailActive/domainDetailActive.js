import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { getChainAddressByChainAddress } from '../../../utils/utils';
import { CustomButton, AddNewTokenNetworkAddress, DomainIcon, LuminoNodeIcon, RifStorageIcon, Menu } from '../../../components';
import rifActions from '../../../actions';
import { GET_RESOLVERS, DEFAULT_ICON } from '../../../constants';
import { SLIP_ADDRESSES } from '../../../constants/slipAddresses';
import niftyActions from '../../../../actions';

class DomainsDetailActiveScreen extends Component {
	static propTypes = {
		addNewNetwork: PropTypes.func.isRequired,
    setNewResolver: PropTypes.func.isRequired,
		setAutoRenew: PropTypes.func.isRequired,
    getChainAddresses: PropTypes.func,
    getUnapprovedTransactions: PropTypes.func,
    showTransactionConfirmPage: PropTypes.func,
    wait: PropTypes.func,
    domain: PropTypes.object.isRequired,
		domainName: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		expirationDate: PropTypes.string.isRequired,
		autoRenew: PropTypes.bool.isRequired,
		ownerAddress: PropTypes.string.isRequired,
    selectedResolverAddress: PropTypes.string.isRequired,
		isOwner: PropTypes.bool,
		isLuminoNode: PropTypes.bool,
		isRifStorage: PropTypes.bool,
	}
	constructor(props) {
		super(props);
    let resolvers = Object.assign([], GET_RESOLVERS());
    let slipChainAddresses = Object.assign([], SLIP_ADDRESSES);
		this.state = {
			resolvers: resolvers,
			selectedResolverIndex: -1,
      slipChainAddresses: slipChainAddresses,
			selectedChainAddress: slipChainAddresses[0].value,
			insertedAddress: '',
      chainAddresses: [],
		};
	}
	updateNetwork = (selectedOption) => {
		this.setState({ selectedNetwork: selectedOption.value });
	}
	updateAddress = (address) => {
		this.setState({ insertedAddress: address });
	}
	addAddress = () => {
		let domains = JSON.parse(localStorage.rnsDomains);
		let networkIndex = -1;
		let resolverIndex = this.state.selectedResolverIndex;
		domains.find((domain, index) => {
			if (domain.domain === this.props.domain.domain){
				networkIndex = index;
				return domain;
			}
		})

		if (networkIndex !== -1 && resolverIndex !== -1){
			let newNetwork = {
				networkName: this.state.selectedNetwork,
				networkIcon:this.state.selectedNetwork,
				address: this.state.insertedAddress,
			};
			domains[networkIndex].resolvers[resolverIndex].network.push(newNetwork);
			localStorage.setItem('rnsDomains', JSON.stringify(domains));
			// Sending back with localstorage rnsDomains (Here we try to get again localstorage so if it wasnt updated, we're going to show whats really saved)
			domains = JSON.parse(localStorage.rnsDomains);
			this.setState({
				resolvers: domains[networkIndex].resolvers,
			});
		}
	}
	showModalAddNetworkAddress = () => {
		let elements = [];
		elements.push(<AddNewTokenNetworkAddress
			updateNetwork={this.updateNetwork.bind(this)}
			updateAddress={this.updateAddress.bind(this)}
      slipChainAddresses={this.state.slipChainAddresses}
		/>);
		let message = {
			title: 'Add new network',
			body: {
				elements: elements,
			},
			confirmLabel: 'SAVE',
			cancelLabel: 'CANCEL',
			confirmCallback: () => {
				this.addAddress()
			},
			cancelCallback: () => {
			},
		};
		this.props.addNewNetwork(message);
	}

	async onChangeComboResolvers (e) {
    for (let resolverItem of e.target.children) {
      if (resolverItem.value === e.target.value) {
        const address = resolverItem.getAttribute('data-address');
        this.props.setNewResolver(this.props.domainName, address);
        await this.props.wait();
        this.showConfirmTransactionPage(() => {
          // TODO: Rodrigo
          // Send back, or wait
        });
        return;
      }
    }
  }
  componentDidMount () {
    this.loadChainAddresses();
  }
  async loadChainAddresses () {
    const chainAddresses = await this.props.getChainAddresses(this.props.domainName);
    this.setState({ chainAddresses: chainAddresses });
  }

  showConfirmTransactionPage (callback) {
    this.props.getUnapprovedTransactions()
      .then(latestTransaction => {
        this.props.showTransactionConfirmPage({
          id: latestTransaction.id,
          unapprovedTransactions: latestTransaction,
          afterApproval: {
            action: (payload) => {
              if (callback) {
                callback(payload);
              }
            },
          },
        });
      });
  }

	render () {
		const { domainName, address, content, expirationDate, autoRenew, ownerAddress, isOwner, isLuminoNode, isRifStorage, selectedResolverAddress } = this.props;
		const { chainAddresses } = this.state;
		return (
      <div className={'body'}>
        <div id="headerName" className={'domain-name'}>
          <span>{domainName}</span>
          {isOwner &&
            <DomainIcon className={'domain-icon'}/>
          }
          {isLuminoNode &&
            <LuminoNodeIcon className={'domain-icon'}/>
          }
          {isRifStorage &&
            <RifStorageIcon className={'domain-icon'}/>
          }
        </div>
        <div id="domainDetailBody" className={'domain-detail-body'}>
          <div id="bodyDescription" className={'domain-description'}>
            <div><span className={'domain-description-field'}>Address:</span><span className={'domain-description-value label-spacing-left'}>{address}</span></div>
            <div><span className={'domain-description-field'}>Content:</span><span className={'domain-description-value label-spacing-left'}>{content}</span></div>
            <div><span className={'domain-description-field'}>Expires on:</span><span className={'domain-description-value label-spacing-left'}>{expirationDate}</span></div>
            <div><span className={'domain-description-field'}>Auto renew: <a href={this.props.setAutoRenew()}>{autoRenew ? 'on' : 'off'}</a></span></div>
            <div><span className={'domain-description-field'}>Owner:</span><span className={'domain-description-value label-spacing-left'}>{ownerAddress}</span></div>
          </div>
          {(isOwner && this.state.resolvers) &&
            <div id="resolversBody" className={'resolvers-body'}>
              <div className="resolver-body-top">
                <div id="selectResolver" className={'custom-select'}>
                  <select id="comboResolvers" className="select-css" onChange={this.onChangeComboResolvers.bind(this)}>
                    <option disabled selected value hidden> Select Resolver </option>
                      {
                        this.state.resolvers.map((resolver, index) => {
                          return (<option
                            key={index}
                            selected={resolver.address === selectedResolverAddress}
                            value={resolver.name}
                            data-address={resolver.address}
                          >{resolver.name}</option>)
                        })
                      }
                  </select>
                </div>
                <CustomButton
                  icon={faPlusCircle}
                  text={'NEW'}
                  onClick={() => this.showModalAddNetworkAddress()}
                  className={
                    {
                      button: 'domain-detail-new-button',
                      icon: 'domain-icon centerY',
                      text: 'center',
                    }
                  }
                />
              </div>
              <div id="resolverChainAddressBody" className={'resolver-chainaddress'}>
                {
                  chainAddresses.length <= 0 ? <div></div> :
                    chainAddresses.map((chainAddress, index) => {
                    const address = getChainAddressByChainAddress(chainAddress.chain);
                    const icon = address.icon ? address.icon : DEFAULT_ICON;
                    return <div key={index} className={'resolver-chainaddress-description'}>
                      <FontAwesomeIcon icon={icon.icon} color={icon.color} className={'domain-icon'}/>
                      <span>{address.symbol}</span>
                      <span className={'resolver-chainaddress-description-address'}>{chainAddress.address}</span>
                    </div>
                  })
                }
              </div>
            </div>
          }
          <Menu />
        </div>
      </div>
		);
	}
}

function mapStateToProps (state) {
	const data = state.appState.currentView.params;
  return {
		dispatch: state.dispatch,
		status: data.status,
		domainName: data.domain,
		address: data.address,
		content: data.content,
		expirationDate: data.expiration,
		autoRenew: data.autoRenew,
		ownerAddress: data.ownerAddress,
		isOwner: state.metamask.selectedAddress.toLowerCase() === data.ownerAddress.toLowerCase(),
		isLuminoNode: data.isLuminoNode,
		isRifStorage: data.isRifStorage,
    selectedResolverAddress: data.selectedResolverAddress,
		domain: data,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addNewNetwork: (message) => dispatch(rifActions.showModal(message)),
    setNewResolver: (domainName, resolverAddress) => dispatch(rifActions.setResolverAddress(domainName, resolverAddress)),
    getChainAddresses: (domainName) => dispatch(rifActions.getChainAddresses(domainName)),
    getUnapprovedTransactions: () => dispatch(rifActions.getUnapprovedTransactions()),
    showTransactionConfirmPage: (data) => dispatch(niftyActions.showConfTxPage(data)),
    wait: (time) => dispatch(rifActions.waitUntil(time)),
		setAutoRenew: () => {},
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(DomainsDetailActiveScreen)
