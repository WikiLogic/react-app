import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

/**
 * Personal details & updating them
 */

@observer
export default class AccountScene extends React.Component {
    static propTypes = {
        userStore: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>
                {window.wl.user.isLoggedIn && (
                    <div>
                        <section>
                            <h2 className="section-title">Change username</h2>
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
                            <button>Update username</button>
                        </section>

                        <section>
                            <h2 className="section-title">Change email</h2>
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
                            <button>Update email</button>
                        </section>

                        <section>
                            <h2 className="section-title">Change password</h2>
                            <label htmlFor="oldpassword">Old Password</label>
                            <input
                                type="password"
                                id="oldpassword"
                                name="oldpassword"
                                value={this.props.userStore.password}
                                onChange={event => {
                                    this.props.userStore.password = event.target.value;
                                }}
                            />
                            <div className="pad" />
                            <label htmlFor="newpassword">New Password</label>
                            <input
                                type="password"
                                id="newpassword"
                                name="newpassword"
                                value={this.props.userStore.password}
                                onChange={event => {
                                    this.props.userStore.password = event.target.value;
                                }}
                            />
                            <div className="pad" />
                            <button>Update password</button>
                        </section>
                    </div>
                )}
            </div>
        );
    }
}
