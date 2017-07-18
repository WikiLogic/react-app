import React from 'react';

/* Alerts / messages / updates / notes - fire them in here!
 *
 */

export default class Notifyer extends React.Component {
  render() {

    return (
      <div className="notifyer">
        {this.props.message}
      </div>
    );
  }
}

Notifyer.propTypes = {
  message: React.PropTypes.string.isRequired,
};
