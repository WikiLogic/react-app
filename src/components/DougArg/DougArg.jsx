import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import GraphClaim from 'WlComponents/GraphClaim/GraphClaim.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class DougArg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // x: props.x,
      // y: props.y,
      claimSize: props.claimSize,
      claimText: props.claimText,
      numberOfArgsInGroup: 2
    };
  }

  render() {
    console.log('claim', this.props.firstArgumentGroup);
    // console.log('claim.arguments', this.props.claim.arguments);
    // console.log('1:', this.props.claim.arguments[0]);
    // console.log('2:', this.props.claim.arguments[1]);

    const searchResultMarkup = [];
    for (let r = 0; r < this.props.firstArgumentGroup.premises.length; r++) {
      searchResultMarkup.push(
        <GraphClaim x={(r * 200) - 100} y={0} claim={this.props.firstArgumentGroup.premises[r]} />
      );
    }

    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <g className="graph-arg">
        <rect rx="1" ry="1" x="-250" y="-250" width="500" height="500" stroke="black" fill="white" />

        {searchResultMarkup }

    {/* <GraphClaim x={0} y={0} claim={this.props.claim.arguments[0]} /> */ }

      </g >
    );
  }
}

DougArg.propTypes = {
  // claimSize: React.PropTypes.number.isRequired,
  // claimText: React.PropTypes.string.isRequired,
  // x: React.PropTypes.number.isRequired,
  // y: React.PropTypes.number.isRequired
};
