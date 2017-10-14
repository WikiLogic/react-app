import React from 'react';
import SVGbutton from 'WlComponents/SVGels/SVGbutton.jsx';
import SVGtext from 'WlComponents/SVGels/SVGtext.jsx';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import GraphArg from 'WlComponents/GraphArg/GraphArg.jsx';

/* The Claim Wrapper for the graph
 * It doesn't need to know where it is on the graph, that's handled by whoever the parent is (probably the graph scene)
 * But it does need to know where it wants to put it's children and then inform the parent about it's size. 
 * It's then up to the parent to accomodate properly.
 */
export default class GraphClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claim: this.props.claim,
      arguments: null
    };
    this.expandArgumentsClickHandler = this.expandArgumentsClickHandler.bind(this);
  }

  expandArgumentsClickHandler() {
    this.setState({
      arguments: this.state.claim.arguments
    });
  }

  //will need a:
  //this.props.resizeHandler

  render() {

    const argumentsForClaim = [];
    if (this.state.arguments) {
      for (let r = 0; r < this.state.arguments.length; r++) {
        argumentsForClaim.push(
          <ClickerDragger x={r * 300} y={100}>
            <GraphArg
              key={r}
              claimSize="200"
              arg={this.state.arguments[r]}
            />
          </ClickerDragger>
        );
      }
    }

    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <g className="graph-claim">

        <rect
          rx="5"
          ry="5"
          width="300"
          height="100"
          className="graph-claim__claim"
        />

        <SVGtext
          x={0}
          y={0}
          width={250}
          height={100}
          text={this.props.claim.text}
        />

        {(this.state.arguments && argumentsForClaim)}

        <SVGbutton
          buttonAction={this.expandArgumentsClickHandler}
          text="+"
          x={250}
          y={56}
        />
      </g>
    );
  }
}

GraphClaim.propTypes = {
  claim: React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    _id: React.PropTypes.string.isRequired,
  }).isRequired,
  expandArgumentsClickHandler: React.PropTypes.func.isRequired
};
