import React from 'react';
import LoginForm from 'WlComponents/LoginForm/LoginForm.jsx';

/**
 * The Authentication page (logging in!)
 * @prop {*} name 
 */
export default class AuthenticationScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.loginSuccessHandler = this.loginSuccessHandler.bind(this);
  }

  loginSuccessHandler(res){
    this.props.loginSuccessHandler(res);
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            Log in!
          </div>
        </div>
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
  loginSuccessHandler: React.PropTypes.func.isRequired,
};
