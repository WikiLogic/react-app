import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

/**
 * The User profile & settings page
 * Here you will be able to change the theme / alert settings / your username / password / etc...
 * @prop {*} name 
 */


@observer
export default class UserProfileScene extends React.Component {

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <div className="layout-cols-2">
              <div className="layout-cols-2__left">
                <h1>{this.props.store.username}</h1>
              </div>
              <div className="layout-cols-2__right">
                <button onClick={this.props.store.logOut}>LOGOUT</button>
              </div>
            </div>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            Currently only the demo login is running, it has no profile data. Proper profiles will be coming!
            <ul>
              <li>Email: {this.props.store.email}</li>
              <li>Signup date: {this.props.store.signUpDate}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

UserProfileScene.propTypes = {
  store: PropTypes.shape({
    username: PropTypes.string,
    signUpDate: PropTypes.string,
    email: PropTypes.string,
    logOut: PropTypes.func
  }).isRequired
};
