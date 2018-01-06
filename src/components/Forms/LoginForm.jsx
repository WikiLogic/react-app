import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import LoadingButton from 'src/components/Loader/LoadingButton.jsx';

/**
 * Logging in!
 */

@observer
export default class LoginForm extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.userStore.logIn();
  }

  render() {
    return (
      <form>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={this.props.userStore.username}
          onChange={(event) => { this.props.userStore.username = event.target.value; }}
        />

        <div className="pad" />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={this.props.userStore.password}
          onChange={(event) => { this.props.userStore.password = event.target.value; }}
        />

        <div className="pad" />

        <LoadingButton
          type="submit"
          value={this.props.userStore.loginResponceMessage}
          isLoading={this.props.userStore.isLoggingIn}
          onClick={this.handleFormSubmit}
        />

      </form>
    );
  }
}
