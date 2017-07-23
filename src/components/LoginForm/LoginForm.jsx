import React from 'react';
import API from 'WlAPI/api.js';

/**
 * Logging in!
 * The API uses JSON Web Tokens which we'll have to pass with every request
 */

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.password = '';
    this.state = {
      username: '',
      password: '',
      message: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit() {
    API.login(this.username, this.password)
      .then((data) => {
        console.log('in!', data);
      }).catch((err) => {
        console.log('err', err);
      });
  }

  render() {
    return (
      <form>
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
          <input type="submit" value="login" onClick={this.handleFormSubmit} />
        </div>
      </form>
    );
  }
}
