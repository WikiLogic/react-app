import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from 'src/components/SignUpForm/SignUpForm.jsx';
import { Link } from 'react-router-dom';

/**
 * The Authentication page (logging in!)
 * @prop {*} name 
 */
export default class SignUpScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.loginSuccessHandler = this.loginSuccessHandler.bind(this);
  }

  loginSuccessHandler(res) {
    this.props.loginSuccessHandler(res);
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <div className="layout-cols-2">
              <div className="layout-cols-2__left">
                Create a new account!
              </div>
              <div className="layout-cols-2__right">
                <Link className="button" to="/login">LOGIN</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            <SignUpForm loginSuccessHandler={this.loginSuccessHandler} />
          </div>
        </div>
      </div>
    );
  }
}

SignUpScene.propTypes = {
  loginSuccessHandler: PropTypes.func.isRequired,
};
