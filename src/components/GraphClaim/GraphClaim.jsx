import React from 'react';
import SVGbutton from 'WlComponents/SVGels/SVGbutton.jsx';
import SVGtext from 'WlComponents/SVGels/SVGtext.jsx';

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
    //we already have the premis up here, the button doesn't actually need to know it, just that it was clicked
    this.props.expandArgumentsClickHandler(this.props.claim);
  }

  //will need a:
  //this.props.resizeHandler

  render() {
    return (
      <g className="graph-claim">

        <rect
          rx="5"
          ry="5"
          width="345"
          height="100"
          className="graph-claim__claim"
        />

        <SVGtext
          x={0}
          y={0}
          width={300}
          height={100}
          text={this.props.claim.text}
        />

        <SVGbutton
          buttonAction={this.props.expandArgumentsClickHandler}
          text="+"
          x={301}
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
