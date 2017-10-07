import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import DougClaim from 'WlComponents/DougClaim/DougClaim.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class DougArg extends React.Component {
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
        <circle cx="-40" cy="-20" r={`${this.state.numberOfArgsInGroup}` * `${this.state.claimSize}`} stroke="black" strokeWidth="1" fill="white" />

        <DougClaim x={-40} y={-20} claimSize={`${this.state.claimSize}`} claimText={`${this.state.claimText}`} />

      </ClickerDragger>
    );
  }
}

DougArg.propTypes = {
  claimSize: React.PropTypes.number.isRequired,
  claimText: React.PropTypes.string.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
