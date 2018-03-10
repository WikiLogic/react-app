import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import LoadingButton from "src/components/Loader/LoadingButton.jsx";
import Errors from "src/components/Alerts/Errors.jsx";

/**
 * Logging in!
 * The API uses JSON Web Tokens which we'll have to pass with every request
 */

@observer
export default class LoginForm extends React.Component {
    static propTypes = {
        userStore: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: ""
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.userStore.signup(this.state.email, this.state.username, this.state.password);
    }

    render() {
        let buttonText = "Signup";
        if (this.props.userStore.isLoggedIn) {
            buttonText = "Success!";
        }
        return (
            <form>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={this.props.userStore.email}
                    onChange={event => {
                        this.props.userStore.email = event.target.value;
                    }}
                />

                <div className="pad" />

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
