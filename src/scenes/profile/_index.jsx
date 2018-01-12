import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ProfileForm from 'src/components/Forms/Profileform.jsx';
import SidebarNav from 'src/components/Sidebar/Nav.jsx';

/**
 * The User profile & settings page
 * Here you will be able to change the theme / alert settings / your username / password / etc...
 * @prop {*} name 
 */

@withRouter
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
                    <SidebarNav links={[
                      { to: '/profile', text: 'Public profile' },
                      { to: '/profile/account', text: 'Account details' },
                      { to: '/profile/emails', text: 'Emails' }
                    ]}
                    />
                  </div>
                }
              </div>
              <div className="sidebar-layout__main">
                <Route
                  path="/profile"
                  exact
                  render={() => {
                    return <div>Signup date: {this.props.store.signUpDate}</div>;
                  }}
                />
                <Route
                  path="/profile/account"
                  exact
                  render={() => {
                    return <ProfileForm userStore={this.props.store} />;
                  }}
                />
                <Route
                  path="/profile/emails"
                  exact
                  render={() => {
                    return <div>email</div>;
                  }}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
