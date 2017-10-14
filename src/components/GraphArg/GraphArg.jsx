import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import GraphClaim from 'WlComponents/GraphClaim/GraphClaim.jsx';

/* An argument! In an SVG!
 */
export default class GraphArg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: (this.props.arg.premises.length * 300) + 20,
      height: 120
    };
  }

  render() {
    //console.log('claim', this.props.firstArgumentGroup);

    const premisesMarkup = [];
    for (let p = 0; p < this.props.arg.premises.length; p++) {
      premisesMarkup.push(
        <ClickerDragger
          x={(p * 300) + 10}
          y={10}
          key={p}
        >
          <GraphClaim
            claim={this.props.arg.premises[p]}
          />
        </ClickerDragger>
      );
    }

    return (
      <g className="graph-arg">
        <rect
          rx="3"
          ry="3"
          x={0}
          y={0}
          width={this.state.width}
          height={this.state.height}
          stroke="black"
          fill="white"
        />

        {/* for each claim in the argument, add it! */}
        {premisesMarkup}

      </g >
    );
  }
}

GraphArg.propTypes = {
  arg: React.PropTypes.shape({
    premises: React.PropTypes.array
  }).isRequired,
};
