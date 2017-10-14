import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import GraphClaim from 'WlComponents/GraphClaim/GraphClaim.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class GraphArg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      claimSize: props.claimSize,
    };
  }

  render() {
    //console.log('claim', this.props.firstArgumentGroup);

    const searchResultMarkup = [];
    for (let r = 0; r < this.props.firstArgumentGroup.premises.length; r++) {
      searchResultMarkup.push(
        <GraphClaim x={-(0.5 * this.props.claimSize) + (this.props.claimSize * r)} y={this.props.claimSize} claim={this.props.firstArgumentGroup.premises[r]} />
      );
    }
//x={this.props.x + (0.5 * this.props.claimSize)}  x="0"
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <g className="graph-arg">
        <rect rx="1" ry="1" x={this.props.x} y={this.props.y} width={this.props.claimSize * this.props.firstArgumentGroup.premises.length} height={this.props.claimSize} stroke="black" fill="white" />

        {searchResultMarkup}

      </g >
    );
  }
}

GraphArg.propTypes = {
  claimSize: React.PropTypes.number.isRequired,
  //claimText: React.PropTypes.string.isRequired, 
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
