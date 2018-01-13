import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

/**
 * The User profile & settings page
 * Here you will be able to change the theme / alert settings / your username / password / etc...
 * @prop {*} name 
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
            TODO: color scheme / font size / notifications
          </div>
        }
      </div>
    );
  }
}
