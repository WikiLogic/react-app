// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

// JS
import API from 'WlAPI/api.js';
import User from 'WlServices/user.js';

// Scenes
import HomeScene from 'WlScenes/HomeScene.jsx';
import SearchScene from 'WlScenes/SearchScene.jsx';
import GraphScene from 'WlScenes/GraphScene.jsx';
import ClaimDetailScene from 'WlScenes/ClaimDetailScene.jsx';
import ClaimCreateScene from 'WlScenes/ClaimCreateScene.jsx';
import StyleguideScene from 'WlScenes/StyleguideScene.jsx';
import AuthenticationScene from 'WlScenes/AuthenticationScene.jsx';
import UserProfileScene from 'WlScenes/UserProfileScene.jsx';
import LegalScene from 'WlScenes/LegalScene.jsx';
import SignUpScene from 'WlScenes/SignUpScene.jsx';
import ApiDev from 'WlScenes/ApiDev.jsx';

// React components
import SearchResults from 'WlComponents/SearchResults/SearchResults.jsx';
import EditClaimForm from 'WlComponents/EditClaimForm/EditClaimForm.jsx';

import wlutils from './utils/_index.js';

wlutils.init();

const history = createHashHistory();

class Wikilogic extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      searchResults: [],
      focused_claim: {},
      notifications: [],
      user: {
        profile: {},
        isLoggedIn: false,
      },
    };

    this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
    this.loginSuccessHandler = this.loginSuccessHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    // This is the place to trigger any network requests that need to go out on the first load
    User.get()
      .then((profile) => {
        if (profile) {
          this.setState({
            user: {
              isLoggedIn: true,
              profile,
            },
          });
        }
      }).catch((err) => {
        this.state.notifications.push(err);
      });
  }

  setNewClaimFocus(claim) {
    API.getClaimDetailById(claim.id)
      .then((data) => {
        this.setState({ focused_claim: data.claim });
      }).catch((err) => {
        this.state.notifications.push(err);
      });
  }


  loginSuccessHandler(res) {
    this.setState({
      user: {
        isLoggedIn: true,
        profile: res.data.user,
      },
    });
    history.push('/profile');
  }

  logoutHandler() {
    User.logout(); // TODO call the server, see if you're logged in anywhere else
    this.setState({
      user: {
        isLoggedIn: false,
        profile: {},
      },
    });
  }

  render() {
    return (
      <div className="main">
        <div className="main__header">

          <header className="header">

            <Link to="/" className="header__title">Wikilogic</Link>

            <div className="header__links">
              <Link to="/search">Search</Link>
              <Link to="/graph">Graph</Link>

              {(this.state.user.isLoggedIn &&
                <Link to="/new-claim">New claim</Link>
              )}

              {(this.state.user.isLoggedIn &&
                <Link to="/profile">Profile</Link>
              )}

              {(!this.state.user.isLoggedIn &&
                <Link to="/login">Login</Link>
              )}

              {(!this.state.user.isLoggedIn &&
                <Link to="/signup">Signup</Link>
              )}
            </div>
          </header>

        </div>

        <main className="main__body">

          <Route path="/" exact component={HomeScene} />

          <Route path="/search" exact component={SearchScene} />

          <Route path="/graph" exact component={GraphScene} />

          <Route
            path="/claim/:claimId"
            exact
            render={(routeProps) => {
              return <ClaimDetailScene routeProps={routeProps} isLoggedIn={this.state.user.isLoggedIn} />;
            }}
          />

          <Route path="/new-claim" exact component={ClaimCreateScene} />

          <Route
            path="/login"
            exact
            render={() => {
              if (this.state.user.isLoggedIn) {
                history.push('/profile');
                return null;
              }
              return <AuthenticationScene loginSuccessHandler={this.loginSuccessHandler} />;
            }}
          />

          <Route
            path="/signup"
            exact
            render={() => {
              if (this.state.user.isLoggedIn) {
                history.push('/profile');
                return null;
              }
              return <SignUpScene loginSuccessHandler={this.loginSuccessHandler} />;
            }}
          />

          <Route
            path="/profile"
            exact
            render={() => {
              if (this.state.user.isLoggedIn) {
                return <UserProfileScene user={this.state.user} logoutHandler={this.logoutHandler} />;
              }
              history.push('/login');
              return null;
            }}
          />

          <Route
            path="/privacy-policy"
            exact
            render={() => {
              return (
                <LegalScene page="privacy-policy" />
              );
            }}
          />

          <Route
            path="/terms-of-use"
            exact
            render={() => {
              return (
                <LegalScene page="terms-of-use" />
              );
            }}
          />

          <Route
            path="/api-dev"
            exact
            render={() => {
              return (
                <ApiDev />
              );
            }}
          />

          {/* Edit claim page ... not sure if this should really be a thing */}
          <Route
            path="/edit-claim"
            exact
            render={() => {
              return (
                <div className="sidebar-layout">
                  <div className="sidebar-layout__main">

                    <EditClaimForm />

                  </div>
                  <div className="sidebar-layout__side">

                    <SearchResults
                      searchResults={this.state.searchResults}
                      resultClickHandler={this.setNewClaimFocus}
                    />

                  </div>
                </div>
              );
            }}
          />

          <Route path="/styleguide" exact component={StyleguideScene} />

        </main>

        <div className="main__footer">
          <footer className="footer max-width-wrap">

            <div className="footer__col">
              Wikilogic is maintainted by
              the <a href="www.wikilogicfoundation.org" target="_blank">Wikilogic Foundation</a>, a
              non-profit organisation...
            </div>
            <div className="footer__col">
              <Link to="/privacy-policy" className="footer__util-link">Privacy policy</Link>
              <Link to="/terms-of-use" className="footer__util-link">Terms of use</Link>
              <Link to="/styleguide" className="footer__util-link">Styleguide</Link>
              <Link to="/api-dev" className="footer__util-link">API</Link>
            </div>

          </footer>
        </div>

        <div className="main__status-bar">
          ...
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={history}>
    <Wikilogic />
  </Router>,
  document.getElementById('root'),
);
