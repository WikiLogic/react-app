import React from 'react';

/* Alerts / messages / updates / notes - fire them in here!
 * This is the bar that sits at the bottom of the screen
 */
export default class Notifyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.notifications[0],
    };
  }

  render() {
    return (
      <div className="notifyer">
        {this.state.current}
      </div>
    );
  }
}

Notifyer.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
