// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

//utilities init themselves
import './utils';

// JS
import API from 'WlAPI/api.js';
import User from './stores/user.js';
import Claims from 'WlStores/claims.js';

// Scenes
import GraphScene from 'WlScenes/GraphScene.jsx';
import GraphStore from 'WlScenes/GraphStore.js';
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

const UserStore = new User();
const history = createHashHistory();

class Wikilogic extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      searchResults: [],
      focused_claim: {},
      notifications: [],
      user: {},
    };

    this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
    this.loginSuccessHandler = this.loginSuccessHandler.bind(this);
  }

  componentDidMount() {
    // This is the place to trigger any network requests that need to go out on the first load
    Claims.init();
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

  render() {
    return (
      <div className="main">
        <div className="main__header">

          <header className="header">

            <Link to="/" className="header__title">Wikilogic</Link>

            <div className="header__links">

              {(UserStore.isLoggedIn &&
                <Link to="/new-claim">New claim</Link>
              )}

              {(UserStore.isLoggedIn &&
                <Link to="/profile">Profile</Link>
              )}

              {(!UserStore.isLoggedIn &&
                <Link to="/login">Login</Link>
              )}

              {(!UserStore.isLoggedIn &&
                <Link to="/signup">Signup</Link>
              )}
            </div>
          </header>

        </div>

        <main className="main__body">

          <Route
            path="/"
            exact
            render={(routeProps) => {
              return (
                <GraphScene
                  store={GraphStore}
                  routeProps={routeProps}
                />
              );
            }}
          />

          <Route
            path="/claim/:claimId"
            exact
            render={(routeProps) => {
              return (
                <ClaimDetailScene
                  routeProps={routeProps}
                  history={history}
                  isLoggedIn={UserStore.isLoggedIn}
                />
              );
            }}
          />

          <Route
            path="/new-claim"
            exact
            render={() => {
              return (
                <ClaimCreateScene
                  history={history}
                />
              );
            }}
          />

          <Route
            path="/login"
            exact
            render={() => {
              if (UserStore.isLoggedIn) {
                history.push('/profile');
                return null;
              }
              return (
                <AuthenticationScene
                  loginSuccessHandler={this.loginSuccessHandler}
                  history={history}
                />
              );
            }}
          />

          <Route
            path="/signup"
            exact
            render={() => {
              if (UserStore.isLoggedIn) {
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
              if (UserStore.isLoggedIn) {
                return <UserProfileScene store={UserStore} />;
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
