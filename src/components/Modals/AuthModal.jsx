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
    userStore: PropTypes.object.isRequired,
    ctrl: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]).isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: true
    };
  }

  render() {
    if (this.props.ctrl !== 'Signup' && this.props.ctrl !== 'Login') {
      return null;
    }

    let modalContent = null;

    if (this.props.ctrl === 'Signup') {
      modalContent = <SignUpForm userStore={this.props.userStore} />;
    }

    if (this.props.ctrl === 'Login') {
      modalContent = <LoginForm userStore={this.props.userStore} />;
    }

    return (
      <Modal
        show={(typeof this.props.ctrl === 'string')}
        title={this.props.ctrl}
        onClose={this.props.onClose}
      >
        {modalContent}
      </Modal>
    );
  }
}
