import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import GraphPremise from 'WlComponents/GraphPremise/GraphPremise.jsx';

/* An argument! In an SVG!
 */
export default class GraphArg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let premiseCounter = 0;
    const premisesMarkup = [];

    for (let p = 0; p < this.props.arg.premises.length; p++) {

      const thisPremisX = (premiseCounter * this.props.gridUnit) + (this.props.padUnit * 2); //premises sit on th innermost box
      const thisPremiseY = this.props.padUnit * 2;
      premisesMarkup.push(
        <ClickerDragger
          x={thisPremisX}
          y={thisPremiseY}
          key={p}
        >
          <GraphPremise
            claim={this.props.arg.premises[p]}
            gridUnit={this.props.gridUnit}
            padUnit={this.props.padUnit}
          />
        </ClickerDragger>
      );

      premiseCounter += this.props.arg.premises.length;
    }

    //the width and height of the rect that will wrap all of the premises in this argument
    const argWidth = (premiseCounter * this.props.gridUnit) - (2 * this.props.padUnit);
    const argHeight = this.props.gridUnit - (2 * this.props.padUnit);
    const gridSquareWidth = premiseCounter * this.props.gridUnit;
    const gridSquareHeight = this.props.gridUnit;

    return (
      <g className="graph-arg">
        <rect
          rx="10"
          ry="10"
          width={gridSquareWidth}
          height={gridSquareHeight}
          className="grid-square"
        />
        <rect
          rx="5"
          ry="5"
          x={this.props.padUnit}
          y={this.props.padUnit}
          width={argWidth}
          height={argHeight}
          className="graph-arg__rect"
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
  gridUnit: React.PropTypes.number.isRequired,
  padUnit: React.PropTypes.number.isRequired
};
