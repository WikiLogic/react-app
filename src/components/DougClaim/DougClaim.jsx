import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
//import DougClaim from 'WlComponents/DougClaim/DougClaim.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class DougClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      claimSize: props.claimSize,
      claimText: props.claimText,
      numberOfArgsInGroup: 2
    };
  }

  render() {
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (

      <ClickerDragger x={`${this.state.x}`} y={`${this.state.y}`}>
        <circle cx="0" cy="0" r={`${this.state.claimSize}`} stroke="black" strokeWidth="1" fill="red" />

      </ClickerDragger>
    );
  }
}

DougClaim.propTypes = {
  claimSize: React.PropTypes.number.isRequired,
  claimText: React.PropTypes.string.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
