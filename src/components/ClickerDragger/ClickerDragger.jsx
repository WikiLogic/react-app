import React from 'react';
import PropTypes from 'prop-types';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class ClickerDragger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y
    };
  }

  render() {
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <g transform={`translate(${this.state.x} ${this.state.y})`} className={this.props.className}>
        {this.props.children}
        {/* <rect x="0" y="0" width="1" height="1" rx="0.1" ry="0.1" fill="#ccc" /> */}
      </g>
    );
  }
}

ClickerDragger.propTypes = {
  children: PropTypes.element.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  className: PropTypes.string
};

ClickerDragger.defaultProps = {
  className: ''
};
