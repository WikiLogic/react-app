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
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    let username = 'anonymous';
    if (window.wl.user.isLoggedIn) {
      username = window.wl.user.username;
    }
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <div className="layout-cols-2">
              <div className="layout-cols-2__left">
                <h1>{username}</h1>
              </div>
              <div className="layout-cols-2__right">
                {window.wl.user.isLoggedIn &&
                  <button onClick={() => { this.props.store.logOut(); }}>LOGOUT</button>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            {window.wl.user.isLoggedIn &&
              <div>
                <p>Currently only the demo login is running, it has no profile data. Proper profiles will be coming!</p>
                <ul>
                  <li>Email: {this.props.store.email}</li>
                  <li>Signup date: {this.props.store.signUpDate}</li>
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
