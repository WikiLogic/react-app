import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ProfileForm from 'src/components/Forms/Profileform.jsx';
import ProfileNav from './_profileNav.jsx';

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
            <div className="sidebar-layout">

              <div className="sidebar-layout__side">
                {window.wl.user.isLoggedIn &&
                  <div>
                    <ProfileNav />
                    <ProfileForm userStore={this.props.store} />
                  </div>
                }
              </div>
              <div className="sidebar-layout__main">
                Signup date: {this.props.store.signUpDate}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
