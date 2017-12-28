import React from 'react';
import PropTypes from 'prop-types';
import ClickerDragger from '../ClickerDragger/ClickerDragger.jsx';
import GraphPremise from '../SVG/GraphPremise.jsx';
// import GraphClaim from '../SVG/GraphClaim.jsx';

/* An argument! In an SVG!
 */
export default class GraphArg extends React.Component {
  static propTypes = {
    arg: PropTypes.object.isRequired,
    graphConfig: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let premiseCounter = 0;
    const premisesMarkup = [];

    console.log('this.props.arg', this.props.arg);
    for (let p = 0; p < this.props.arg.premises.length; p++) {

      const thisPremisX = (premiseCounter * this.props.graphConfig.gridUnit) + (this.props.graphConfig.padUnit * 2); //premises sit on th innermost box
      const thisPremiseY = this.props.graphConfig.padUnit * 2;
      premisesMarkup.push(
        <ClickerDragger
          x={thisPremisX}
          y={thisPremiseY}
          key={p}
        >
          <GraphPremise
            claim={this.props.arg.premises[p]}
            graphConfig={this.props.graphConfig}
          />

          {/* <GraphClaim
            claim={this.props.arg.premises[p]}
            premiseClickHandler={this.loadClaim}
            gridUnit={this.props.gridUnit}
            padUnit={this.props.padUnit}
          /> */}

        </ClickerDragger>
      );

      premiseCounter += this.props.arg.premises.length;
    }

    //the width and height of the rect that will wrap all of the premises in this argument
    const argWidth = (premiseCounter * this.props.graphConfig.gridUnit) - (2 * this.props.graphConfig.padUnit);
    const argHeight = this.props.graphConfig.gridUnit - (2 * this.props.graphConfig.padUnit);
    const gridSquareWidth = premiseCounter * this.props.graphConfig.gridUnit;
    const gridSquareHeight = this.props.graphConfig.gridUnit;

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
          x={this.props.graphConfig.padUnit}
          y={this.props.graphConfig.padUnit}
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
