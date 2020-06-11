import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import rifActions from '../../../../actions';
import niftyActions from '../../../../../actions';
import {pageNames} from '../../../../pages/index';

class AddNewSubdomain extends Component {
  static propTypes = {
    domainName: PropTypes.string.isRequired,
    ownerAddress: PropTypes.string.isRequired,
    createSubdomain: PropTypes.func,
    waitForListener: PropTypes.func,
    showToast: PropTypes.func,
    showPopup: PropTypes.func,
    showThis: PropTypes.func,
    showTransactionConfirmPage: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      newSubdomain: {},
    };
  }

  async addSubdomain () {
    /**
     * TODO Rodrigo
     * When confirming and submiting is redirecting to wrong direction
     */
    const transactionListenerId = await this.props.createSubdomain(
      this.props.domainName,
      this.state.newSubdomain.name.toLowerCase(),
      this.state.newSubdomain.owner,
      this.props.ownerAddress);
    this.props.waitForListener(transactionListenerId).then(transactionReceipt => {
      this.showCreationSuccess();
    });
    this.props.showPopup('Confirmation', {
      text: 'Please confirm the operation in the next screen to create the subdomain.',
      hideCancel: true,
      confirmCallback: async () => {
        this.props.showTransactionConfirmPage({
          action: (payload) => {
            this.props.showThis({
              ...this.props,
            });
            this.props.showToast('Waiting Confirmation');
          },
          payload: null,
        });
      },
    });
  }

  render () {
    return (
      <div className={''}>
        <input key="subdomain-name" type="text" placeholder="Subdomain Name" onChange={(e) => {
          const newSubdomain = this.state.newSubdomain;
          newSubdomain.name = e.target.value;
          this.setState({newSubdomain});
        }}/>
        <input key="subdomain-owner" type="text" placeholder="Owner Address (Optional)" onChange={(e) => {
          const newSubdomain = this.state.newSubdomain;
          newSubdomain.owner = e.target.value;
          this.setState({newSubdomain});
        }}/>
        <button className={''} onClick={() => this.addSubdomain()} >Change</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    dispatch: state.dispatch,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showThis: (params) => dispatch(rifActions.navigateTo(pageNames.rns.subdomains, params)),
    showPopup: (title, opts) => {
      dispatch(rifActions.showModal({
        title,
        ...opts,
      }));
    },
    createSubdomain: (domainName, subdomain, ownerAddress, parentOwnerAddress) => dispatch(rifActions.createSubdomain(domainName, subdomain, ownerAddress, parentOwnerAddress)),
    waitForListener: (transactionListenerId) => dispatch(rifActions.waitForTransactionListener(transactionListenerId)),
    showToast: (message, success) => dispatch(niftyActions.displayToast(message, success)),
    showTransactionConfirmPage: (afterApproval) => dispatch(rifActions.goToConfirmPageForLastTransaction(afterApproval)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddNewSubdomain)
