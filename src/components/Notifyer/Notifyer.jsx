import React from 'react';

/* Alerts / messages / updates / notes - fire them in here!
 *
 */

export default function Notifyer(props) {
  return (
    <div className="notifyer">
      {props.message}
    </div>
  );
}

Notifyer.propTypes = {
  message: React.PropTypes.string.isRequired,
};
