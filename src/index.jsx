// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import createHashHistory from 'history/createHashHistory';

//utilities init themselves
import './utils';

// JS
import RootStore from 'src/stores/root.js';

// Scenes
import GraphScene from './scenes/GraphScene.jsx';
// import ClaimDetailScene from './scenes/ClaimDetailScene.jsx';
import StyleguideScene from './scenes/StyleguideScene.jsx';
import UserProfileScene from './scenes/UserProfileScene.jsx';
import LegalScene from './scenes/LegalScene.jsx';
import ApiDev from './scenes/ApiDev.jsx';

// React components
import SearchResults from './components/SearchResults/SearchResults.jsx';
import EditClaimForm from './components/EditClaimForm/EditClaimForm.jsx';
import AuthModal from 'src/components/Modals/AuthModal.jsx';
import ClaimDetailModal from 'src/components/Modals/ClaimDetailModal.jsx';

const history = createHashHistory();

@withRouter
@observer
class Wikilogic extends React.Component {
  static propTypes = {
    RootStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      focused_claim: {}
    };

    this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
  }

  componentDidMount() {
    window.wl.user.getUserData();
  }

  setNewClaimFocus(claim) {
    //TODO: mobxify this
    console.log('hihihih ehh - todo here!', claim);
  }

  render() {
    return (
      <div className="main">
        <div className="main__header">

          <header className="header">

            <Link to="/" className="header__title">Wikilogic</Link>

            <div className="header__links">

              {(this.props.RootStore.UserStore.isLoggedIn &&
                <Link to="/profile">Profile</Link>
              )}

              {(!this.props.RootStore.UserStore.isLoggedIn &&
                <button
                  onClick={() => { this.props.RootStore.UserStore.authModal = 'Login'; }}
                >Login</button>
              )}

              {(!this.props.RootStore.UserStore.isLoggedIn &&
                <button
                  onClick={() => { this.props.RootStore.UserStore.authModal = 'Signup'; }}
                >Signup</button>
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
                  graphSceneStore={this.props.RootStore.GraphSceneStore}
                  routeProps={routeProps}
                />
              );
            }}
          />

          {/* <Route
            path="/claim/:claimId"
            exact
            render={(routeProps) => {
              return (
                <ClaimDetailScene
                  routeProps={routeProps}
                  history={history}
                  isLoggedIn={this.props.RootStore.UserStore.isLoggedIn}
                />
              );
            }}
          /> */}

          <Route
            path="/profile"
            exact
            render={() => {
              return <UserProfileScene store={this.props.RootStore.UserStore} />;
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

        <AuthModal
          userStore={this.props.RootStore.UserStore}
          ctrl={this.props.RootStore.UserStore.authModal}
          onClose={() => {
            this.props.RootStore.UserStore.authModal = false;
          }}
        />
        <ClaimDetailModal
          modalCtrl={this.props.RootStore.claimDetailModal}
          onClose={() => {
            this.props.RootStore.UserStore.authModal = false;
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={history}>
    <Wikilogic RootStore={new RootStore()} />
  </Router>,
  document.getElementById('root'),
);
