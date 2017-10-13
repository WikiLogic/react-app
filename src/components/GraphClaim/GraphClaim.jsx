import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import ButtonSVG from 'WlComponents/ButtonSVG/ButtonSVG.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class GraphClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfArgsInGroup: 2
    };

    this.expandArgumentsClickHandler = this.expandArgumentsClickHandler.bind(this);
  }

  expandArgumentsClickHandler(premise) {
    this.props.expandArgumentsClickHandler(premise);
  }

  render() {
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <ClickerDragger x={this.props.x} y={this.props.y}>
        <g className="graph-claim">

          <circle cx="0" cy="0" r="100" stroke="black" strokeWidth="1" fill="red" className="graph-claim__claim" />

          <text x="0" y="20">{this.props.claim.text}</text>

          <ButtonSVG x={0} y={0} buttonAction={this.props.expandArgumentsClickHandler} />
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
  y: React.PropTypes.number.isRequired,
  expandArgumentsClickHandler: React.PropTypes.func.isRequired
};
