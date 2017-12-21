import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'src/components/LoginForm/LoginForm.jsx';
import Loader from 'src/components/Loader/Loader.jsx';
import { Link } from 'react-router-dom';

/**
 * The Authentication page (logging in!)
 * @prop {*} name 
 */
export default class AuthenticationScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
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
                Login!
              </div>
              <div className="layout-cols-2__right">
                <Link className="button" to="/signup">SIGN UP</Link>
              </div>
            </div>
          </div>
        </div>
        <Loader isLoading={this.state.isLoading} />
        <div className="page__body">
          <div className="max-width-wrap">
            <LoginForm loginSuccessHandler={this.loginSuccessHandler} />
          </div>
        </div>
      </div>
    );
  }
}

AuthenticationScene.propTypes = {
  loginSuccessHandler: PropTypes.func.isRequired,
};
