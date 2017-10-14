import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import ButtonSVG from 'WlComponents/ButtonSVG/ButtonSVG.jsx';
import GraphArg from 'WlComponents/GraphArg/GraphArg.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class GraphClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfArgsInGroup: 2,
      arguments: null
    };
    this.expandArgumentsClickHandler = this.expandArgumentsClickHandler.bind(this);
  }

  expandArgumentsClickHandler(result) {
    console.log('expand: ', result);
    this.setState({
      arguments: result
    });
  }

  render() {
    console.log('11:', this.props.claim);
    // console.log('2:', this.props.claim.arguments[1]);

    const argumentsForClaim = [];
    if (this.props.claim.arguments) {
      for (let r = 0; r < this.props.claim.arguments.length; r++) {
        argumentsForClaim.push(
          <GraphArg x="-200" y="100" claimSize="200" firstArgumentGroup={this.props.claim.arguments[r]} />
        );
      }
    }

    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <ClickerDragger x={this.props.x} y={this.props.y}>
        <g className="graph-claim">

          <circle cx="0" cy="0" r="100" stroke="black" strokeWidth="1" fill="red" className="graph-claim__claim" />

          <text x="0" y="20">{this.props.claim.text}</text>

          <ButtonSVG x={0} y={0} buttonAction={this.expandArgumentsClickHandler} />

          {(this.state.arguments && argumentsForClaim)}

        </g>

      </ClickerDragger>
    );
  }
}

GraphClaim.propTypes = {
  claim: React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    _id: React.PropTypes.string.isRequired,
  }).isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
