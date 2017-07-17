import React from 'react';

/* The modal layout
 *
 */

export default class Modal extends React.Component {

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal__body">
          <div className="modal__header">
            <h3 className="modal__title">{this.props.title}</h3>
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
          <div className="modal__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired
};