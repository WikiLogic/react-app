import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Group from './group.jsx';
import GraphPremise from '../SVG/GraphPremise.jsx';

/* An argument! In an SVG!
 */

@observer
export default class GraphArg extends React.Component {
  static propTypes = {
    argStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const premisesMarkup = [];

    this.props.argStore.premises.forEach((premise) => {
      premisesMarkup.push(
        <GraphPremise
          key={premise._key}
          premiseStore={premise}
        />
      );
    });

    //the width and height of the rect that will wrap all of the premises in this argument
    // const argWidth = (premiseCounter * this.props.graphConfig.gridUnit) - (2 * this.props.graphConfig.padUnit);
    // const argHeight = this.props.graphConfig.gridUnit - (2 * this.props.graphConfig.padUnit);
    // const gridSquareWidth = premiseCounter * this.props.graphConfig.gridUnit;
    // const gridSquareHeight = this.props.graphConfig.gridUnit;

    return (
      <g className="graph-arg">
        <rect
          rx="10"
          ry="10"
          x={this.props.argStore.x}
          y={this.props.argStore.y}
          width={this.props.argStore.w}
          height={this.props.argStore.h}
          className="grid-square"
        />
        <rect
          rx="5"
          ry="5"
          x={this.props.argStore.x}
          y={this.props.argStore.y}
          width={this.props.argStore.w}
          height={this.props.argStore.h}
          className="graph-arg__rect"
        />

        {premisesMarkup}

      </g >
    );
  }
}
