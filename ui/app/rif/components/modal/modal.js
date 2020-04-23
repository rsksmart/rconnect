import React, {Component} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import rifActions from '../../actions'

class CustomModal extends Component {

  static propTypes = {
    message: PropTypes.object,
    opened: PropTypes.bool,
    dispatch: PropTypes.func,
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
  }

  closeModal () {
    this.props.dispatch(rifActions.hideModal())
  }

  cancel () {
    this.props.message.cancelCallback()
    this.closeModal()
  }

  confirm () {
    this.props.message.confirmCallback()
    this.closeModal()
  }

  render () {
    let body = null
    if (this.props.message.body.text)
        body = (<p>{this.props.message.body.text}</p>)
    else if (this.props.message.body.elements){
      body = []
      this.props.message.body.elements.map((element, index) => {
        body.push(<div key={index}>{element}</div>)
      });
    }
    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        className="modal">
        <div className="modal-message">
          <h1>{this.props.message.title}</h1>
          {body}
          <div className="modal-buttons">
            <button onClick={this.cancel.bind(this)}>{this.props.message.cancelLabel}</button>
            <button onClick={this.confirm.bind(this)}>{this.props.message.confirmLabel}</button>
          </div>
        </div>
      </Modal>
    )
  }
}
function mapStateToProps (state) {
  return {
    dispatch: state.dispatch,
  }
}
module.exports = connect(mapStateToProps)(CustomModal)