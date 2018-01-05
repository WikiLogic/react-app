import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from 'src/components/Loader/LoadingButton.jsx';

/**
 * Logging in!
 * The API uses JSON Web Tokens which we'll have to pass with every request
 */

export default class LoginForm extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      message: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.userStore.signup(this.state.email, this.state.username, this.state.password);
  }

  render() {
    return (
      <form>
        
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />

        <div className="pad" />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />

        <div className="pad" />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />

        <div className="pad" />

        <LoadingButton type="submit" value="Sign up!" onClick={this.handleFormSubmit} />

      </form>
    );
  }
}
