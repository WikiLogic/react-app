import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import LoadingButton from "src/components/Loader/LoadingButton.jsx";
import Errors from "src/components/Alerts/Errors.jsx";

/**
 * Logging in!
 */

@observer
export default class LoginForm extends React.Component {
    static propTypes = {
        userStore: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        if (!this.props.userStore.isLoggingIn) {
            this.props.userStore.logIn();
        }
    }

    render() {
        let buttonText = "Login";
        if (this.props.userStore.isLoggedIn) {
            buttonText = "Success!";
        }
        return (
            <form>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={this.props.userStore.username}
                    onChange={event => {
                        this.props.userStore.username = event.target.value;
                    }}
                />

                <div className="pad" />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={this.props.userStore.password}
                    onChange={event => {
                        this.props.userStore.password = event.target.value;
                    }}
                />

                <div className="pad" />

                {this.props.userStore.errors.length > 0 && (
                    <div>
                        <Errors errors={this.props.userStore.errors} />
                        <div className="pad" />
                    </div>
                )}

                <LoadingButton
                    type="submit"
                    value={buttonText}
                    isLoading={this.props.userStore.isLoggingIn}
                    onClick={this.handleFormSubmit}
                />
            </form>
        );
    }
}
