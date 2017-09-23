import React from 'react';
import Note from './Note.jsx';

/* Alerts / messages / updates / notes - fire them in here!
 * This sits in the "status bar" at the bottom of the screen
 */
export default class Notifyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.notifications[0],
    };
    this.renderNotifications = this.renderNotifications.bind(this);
  }

  renderNotifications() {
    const notificationMarkup = [];
    for (let n = 0; n < this.state.current; n++) {
      notificationMarkup.push(<Note key={n} title={this.state.current[n]} />);
    }
    return notificationMarkup;
  }

  render() {

    return (
      <div className="notifyer">
        {this.renderNotifications()}
      </div>
    );
  }
}

Notifyer.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.shape).isRequired,
};
