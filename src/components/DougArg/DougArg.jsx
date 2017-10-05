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
      x: this.props.x
      , y: this.props.y
      , claimSize: this.props.claimSize
      , claimText: this.props.claimText
    };
  }

  render() {
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (

      <ClickerDragger x={`${this.state.x}`} y={`${this.state.y}`}>
        <circle cx="0" cy="0" r={`${this.state.numberOfArgsInGroup}` * `${this.state.claimSize}`} stroke="black" strokeWidth="1" fill="white" />

        <DougClaim x={-20} y={0} claimSize={`${this.state.claimSize}`} claimText={`${this.state.claimText}`} >
        </DougClaim>

        <DougClaim x={20} y={0} claimSize={`${this.state.claimSize}`} claimText={"thisdoiong it"} />
      </ClickerDragger>
    );
  }
}

ClickerDragger.propTypes = {
  children: React.PropTypes.element.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
