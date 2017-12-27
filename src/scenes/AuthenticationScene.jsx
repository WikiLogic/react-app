import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'src/components/LoginForm/LoginForm.jsx';
import Loader from 'src/components/Loader/Loader.jsx';

/**
 * The Authentication page (logging in!)
 * @prop {*} name 
 */
export default class AuthenticationScene extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <h1>Login</h1>
          </div>
        </div>
        <Loader isLoading={this.state.isLoading} />
        <div className="page__body">
          <div className="max-width-wrap">
            <LoginForm userStore={this.props.userStore} />
          </div>
        </div>
      </div>
    );
  }
}
