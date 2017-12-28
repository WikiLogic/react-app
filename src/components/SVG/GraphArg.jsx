import React from 'react';
import PropTypes from 'prop-types';
import ClickerDragger from '../ClickerDragger/ClickerDragger.jsx';
import GraphPremise from '../SVG/GraphPremise.jsx';

/* An argument! In an SVG!
 */
export default class GraphArg extends React.Component {
  static propTypes = {
    argStore: PropTypes.object.isRequired,
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

    console.log('this.props.argStore', this.props.argStore);

    this.props.argStore.premises.forEach((premise) => {

      const thisPremisX = (premiseCounter * this.props.graphConfig.gridUnit) + (this.props.graphConfig.padUnit * 2); //premises sit on th innermost box
      const thisPremiseY = this.props.graphConfig.padUnit * 2;
      premisesMarkup.push(
        <ClickerDragger
          x={thisPremisX}
          y={thisPremiseY}
          key={premise._key}
        >
          <GraphPremise
            premiseStore={premise}
            graphConfig={this.props.graphConfig}
          />
        </ClickerDragger>
      );

      premiseCounter += this.props.argStore.premises.length;
    });

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

        {premisesMarkup}

      </g >
    );
  }
}
