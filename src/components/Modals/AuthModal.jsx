import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import LoginForm from 'src/components/Forms/LoginForm.jsx';
import SignUpForm from 'src/components/Forms/SignUpForm.jsx';
/** 
 * Controlling our position on the graph!
 * Or at least handing up responsibility for controlling it back up to the graph, but handling the ui / interaction events
 */

export default class AuthModal extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: true
    };
  }

  render() {
    let modalContent = null;

    if (this.state.showSignup) {
      modalContent = <SignUpForm userStore={this.props.userStore} />;
    }

    if (this.state.showLogin) {
      modalContent = <LoginForm userStore={this.props.userStore} />;
    }

    return (
      <Modal
        show="true"
        title="auth"
        onClose={() => {}}
      >
        {modalContent}
      </Modal>
    );
  }
}
