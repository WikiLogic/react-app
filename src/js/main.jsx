// React
import React from "react";
import ReactDOM from "react-dom";
import { Router, Link, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { createHashHistory } from "history";

//utilities init themselves
import "./utils";

// JS
import RootStore from "src/stores/root.js";

// Scenes
import GraphScene from "./scenes/GraphScene.jsx";
import StyleguideScene from "./scenes/StyleguideScene.jsx";
import UserProfileScene from "./scenes/profile/_index.jsx";
import LegalScene from "./scenes/LegalScene.jsx";
import ApiDev from "./scenes/ApiDev.jsx";

// React components
import AuthModal from "src/components/Modals/AuthModal.jsx";
import ClaimDetailModal from "src/components/Modals/ClaimDetailModal.jsx";

const history = createHashHistory();

@withRouter
@observer
class Wikilogic extends React.Component {
    static propTypes = {
        RootStore: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        window.wl.user.getUserData();
    }

    render() {
        let noScrollClass = "";
        if (this.props.RootStore.claimDetailModal.isOpen) {
            noScrollClass = "main--no-scroll";
        }
        return (
            <div className={`main ${noScrollClass}`}>
                <div className="main__header">
                    <header className="header">
                        <Link to="/" className="header__title">
                            Wikilogic
                        </Link>

                        <div className="header__links">
                            {this.props.RootStore.UserStore.isLoggedIn && (
                                <Link to="/profile">Profile</Link>
                            )}

                            {!this.props.RootStore.UserStore.isLoggedIn && (
                                <button
                                    onClick={() => {
                                        this.props.RootStore.UserStore.authModal = "Login";
                                    }}
                                >
                                    Login
                                </button>
                            )}

                            {!this.props.RootStore.UserStore.isLoggedIn && (
                                <button
                                    onClick={() => {
                                        this.props.RootStore.UserStore.authModal = "Signup";
                                    }}
                                >
                                    Signup
                                </button>
                            )}
                        </div>
                    </header>
                </div>

                <main className="main__body">
                    <Route
                        path="/"
                        exact
                        render={routeProps => {
                            return (
                                <GraphScene
                                    graphSceneStore={this.props.RootStore.GraphSceneStore}
                                    routeProps={routeProps}
                                />
                            );
                        }}
                    />

                    <Route
                        path="/profile"
                        render={() => {
                            return <UserProfileScene store={this.props.RootStore.UserStore} />;
                        }}
                    />

                    <Route
                        path="/privacy-policy"
                        exact
                        render={() => {
                            return <LegalScene page="privacy-policy" />;
                        }}
                    />

                    <Route
                        path="/terms-of-use"
                        exact
                        render={() => {
                            return <LegalScene page="terms-of-use" />;
                        }}
                    />

                    <Route
                        path="/api-dev"
                        exact
                        render={() => {
                            return <ApiDev />;
                        }}
                    />

                    <Route path="/styleguide" exact component={StyleguideScene} />
                </main>

                <div className="main__footer">
                    <footer className="footer max-width-wrap">
                        <div className="footer__col">
                            Wikilogic is maintainted by the{" "}
                            <a href="www.wikilogicfoundation.org" target="_blank">
                                Wikilogic Foundation
                            </a>, a non-profit organisation...
                        </div>
                        <div className="footer__col">
                            <Link to="/privacy-policy" className="footer__util-link">
                                Privacy policy
                            </Link>
                            <Link to="/terms-of-use" className="footer__util-link">
                                Terms of use
                            </Link>
                            <Link to="/styleguide" className="footer__util-link">
                                Styleguide
                            </Link>
                            <Link to="/api-dev" className="footer__util-link">
                                API
                            </Link>
                        </div>
                    </footer>
                </div>

                <div className="main__status-bar">...</div>

                <ClaimDetailModal modalCtrl={this.props.RootStore.claimDetailModal} />

                <AuthModal
                    userStore={this.props.RootStore.UserStore}
                    ctrl={this.props.RootStore.UserStore.authModal}
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
    document.getElementById("root")
);
