import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class DougClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x
      , y: this.props.y
      , claimSize: this.props.claimSize
      , claimText: this.props.claimText
    };
  }

  render() {
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <ClickerDragger x={`${this.state.x}`} y = {`${this.state.y}` }>
        <circle cx="40" cy="0" r={`${this.state.claimSize}`} stroke="black" strokeWidth="1" fill="blue" />
        <text x="-20" fontSize="5">{`${this.state.claimText}`} </text>
      </ClickerDragger>
    );
  }
}

ClickerDragger.propTypes = {
  children: React.PropTypes.element.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
