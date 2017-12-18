import React from 'react';
import User from 'WLStores/user.js';

/**
 * The User profile & settings page
 * Here you will be able to change the theme / alert settings / your username / password / etc...
 * @prop {*} name 
 */
export default class UserProfileScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      signUpDate: '',
      username: ''
    };

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    User.get().then((data) => {
      console.log('Got user data!', data);
      this.setState({
        email: data.email,
        signUpDate: data.signUpDate,
        username: data.username
      });
    }).catch((err) => {
      console.error('get user data failed', err);
    });
  }

  logoutHandler() {
    this.props.logoutHandler();
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <div className="layout-cols-2">
              <div className="layout-cols-2__left">
                <h1>{this.state.username}</h1>
              </div>
              <div className="layout-cols-2__right">
                <button onClick={this.logoutHandler}>LOGOUT</button>
              </div>
            </div>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            Currently only the demo login is running, it has no profile data. Proper profiles will be coming!
            <ul>
              <li>Email: {this.state.email}</li>
              <li>Signup date: {this.state.signUpDate}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

UserProfileScene.propTypes = {
  logoutHandler: React.PropTypes.func.isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
};

UserProfileScene.defaultProps = {
  user: {
    name: 'Not Logged In',
  },
};
