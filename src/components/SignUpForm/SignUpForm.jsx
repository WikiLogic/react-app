import React from 'react';
import PropTypes from 'prop-types';
import User from 'WlStores/user.js';

/**
 * Logging in!
 * The API uses JSON Web Tokens which we'll have to pass with every request
 */

export default class LoginForm extends React.Component {
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
    User.signup(this.state.email, this.state.username, this.state.password)
      .then((res) => {
        // it's looking for the user
        this.props.loginSuccessHandler(res);
      }).catch((err) => {
        window.err = err;
      });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Sign up!" onClick={this.handleFormSubmit} />
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  loginSuccessHandler: PropTypes.func.isRequired,
};
