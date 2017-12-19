import React from 'react';
import PropTypes from 'prop-types';

/* The modal layout
 *
 */

export default function Modal(props) {
  // Render nothing if the "show" prop is false
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <h3 className="modal__title">{props.title}</h3>
          <button onClick={props.onClose}>
            Close
          </button>
        </div>
        <div className="modal__content">
          {props.children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
