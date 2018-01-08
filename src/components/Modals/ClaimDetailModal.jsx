import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import ClaimDetail from 'src/components/Claim/Detail.jsx';

/** 
 * Controlling our position on the graph!
 * Or at least handing up responsibility for controlling it back up to the graph, but handling the ui / interaction events
 */

export default class ClaimDetailModal extends React.Component {
  static propTypes = {
    modalCtrl: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <Modal
        show={this.props.modalCtrl.isOpen}
        title="Claim detail"
        onClose={this.props.onClose}
      >
        <ClaimDetail
          claimStore={this.props.modalCtrl.claim}
          isLoggedIn
        />
      </Modal>
    );
  }
}
