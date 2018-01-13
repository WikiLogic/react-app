import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

/**
 * Your profile as others see it
 */

@observer
export default class ProfileScene extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        {window.wl.user.isLoggedIn &&
          <div>
            <div>Signup date: {this.props.userStore.signUpDate}</div>
            <div>{this.props.userStore.username}</div>
          </div>
        }
      </div>
    );
  }
}
