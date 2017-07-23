// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

// JS
import API from 'WlAPI/api.js';

// Scenes
import HomeScene from 'WlScenes/HomeScene.jsx';
import SearchScene from 'WlScenes/SearchScene.jsx';
import ClaimDetailScene from 'WlScenes/ClaimDetailScene.jsx';
import ClaimCreateScene from 'WlScenes/ClaimCreateScene.jsx';
import StyleguideScene from 'WlScenes/StyleguideScene.jsx';
import AuthenticationScene from 'WlScenes/AuthenticationScene.jsx';

// React components
import SearchResults from 'WlComponents/SearchResults/SearchResults.jsx';
import EditClaimForm from 'WlComponents/EditClaimForm/EditClaimForm.jsx';
import Notifyer from 'WlComponents/Notifyer/Notifyer.jsx';


const history = createHashHistory();

class Wikilogic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_results: [],
      focused_claim: {},
      notifications: [],
    };

    this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
    this.notifyerHandler = this.notifyerHandler.bind(this);
  }

  setNewClaimFocus(claim) {
    API.getClaimDetailById(claim.id)
      .then((data) => {
        this.setState({ focused_claim: data.claim });
      }).catch((err) => {
        this.state.notifications.push(err);
      });
  }

  notifyerHandler(message) {
    this.state.notifications.push(message);
  }

  render() {
    return (
      <div className="main">
        <div className="main__header">

          <header className="header">

            <Link to="/" className="header__title">Wikilogic</Link>

            <div className="header__links">
              <Link to="/search">Search</Link>
              <Link to="/new-claim">New claim</Link>
              <Link to="/login">Login</Link>
            </div>

          </header>

        </div>

        <main className="main__body">

          <Route path="/" exact component={HomeScene} />

          <Route path="/search" exact component={SearchScene} />

          <Route path="/claim/:claimId" exact component={ClaimDetailScene} />

          <Route path="/new-claim" exact component={ClaimCreateScene} />

          <Route path="/login" exact component={AuthenticationScene} />

          {/* Edit claim page ... not sure if this should really be a thing */}
          <Route
            path="/edit-claim"
            exact
            render={() => (
              <div className="sidebar-layout">
                <div className="sidebar-layout__main">

                  <EditClaimForm />

                </div>
                <div className="sidebar-layout__side">

                  <SearchResults
                    search_results={this.state.search_results}
                    resultClickHandler={this.setNewClaimFocus}
                  />

                </div>
              </div>
            )}
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
              Privacy policy <Link to="/styleguide">Styleguide</Link>
            </div>
            <div className="footer__col">
              Terms of use
            </div>

          </footer>
        </div>

        <div className="main__notifications">
          <Notifyer notifications={this.state.notifications} />
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
