import React from 'react';
import PropTypes from 'prop-types';

/**
 * Set the position of things
 */

export default class Group extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <g transform={`translate(${this.props.x} ${this.props.y})`} className={this.props.className}>
        {this.props.children}
      </g>
    );
  }
}
