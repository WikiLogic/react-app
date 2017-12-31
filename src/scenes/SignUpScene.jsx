import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from 'src/components/SignUpForm/SignUpForm.jsx';

/**
 * The Authentication page (logging in!)
 * @prop {*} name 
 */
export default class SignUpScene extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <h1>Sign up</h1>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            <SignUpForm userStore={this.props.userStore} />
          </div>
        </div>
      </div>
    );
  }
}
