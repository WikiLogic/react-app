// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

//utilities init themselves
import './utils';

// JS
// import API from './API/api.js';
import User from './stores/user.js';
// import Claims from './stores/claims.js';

// Scenes
import GraphScene from './scenes/GraphScene.jsx';
import GraphSceneStore from './scenes/GraphScene.js';
import ClaimDetailScene from './scenes/ClaimDetailScene.jsx';
import StyleguideScene from './scenes/StyleguideScene.jsx';
import AuthenticationScene from './scenes/AuthenticationScene.jsx';
import UserProfileScene from './scenes/UserProfileScene.jsx';
import LegalScene from './scenes/LegalScene.jsx';
import SignUpScene from './scenes/SignUpScene.jsx';
import ApiDev from './scenes/ApiDev.jsx';

// React components
import SearchResults from './components/SearchResults/SearchResults.jsx';
import EditClaimForm from './components/EditClaimForm/EditClaimForm.jsx';

const history = createHashHistory();

class Wikilogic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      focused_claim: {},
      notifications: [],
      UserStore: new User()
    };

    this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
  }

  setNewClaimFocus(claim) {
    //TODO: mobxify this
    console.log('hihihih ehh - todo here!', claim);
    // API.getClaimDetailById(claim.id)
    //   .then((data) => {
    //     this.setState({ focused_claim: data.claim });
    //   }).catch((err) => {
    //     this.state.notifications.push(err);
    //   });
  }

  render() {
    return (
      <div className="main">
        <div className="main__header">

          <header className="header">

            <Link to="/" className="header__title">Wikilogic</Link>

            <div className="header__links">

              {(this.state.UserStore.isLoggedIn &&
                <Link to="/profile">Profile</Link>
              )}

              {(!this.state.UserStore.isLoggedIn &&
                <Link to="/login">Login</Link>
              )}

              {(!this.state.UserStore.isLoggedIn &&
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
                  store={new GraphSceneStore()}
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
                  isLoggedIn={this.state.UserStore.isLoggedIn}
                />
              );
            }}
          />

          <Route
            path="/login"
            exact
            render={() => {
              if (this.state.UserStore.isLoggedIn) {
                history.push('/profile');
                return null;
              }
              return (
                <AuthenticationScene
                  history={history}
                  userStore={this.state.UserStore}
                />
              );
            }}
          />

          <Route
            path="/signup"
            exact
            render={() => {
              if (this.state.UserStore.isLoggedIn) {
                history.push('/profile');
                return null;
              }
              return (<SignUpScene
                userStore={this.state.UserStore}
              />);
            }}
          />

          <Route
            path="/profile"
            exact
            render={() => {
              if (this.state.UserStore.isLoggedIn) {
                return <UserProfileScene store={this.state.UserStore} />;
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
