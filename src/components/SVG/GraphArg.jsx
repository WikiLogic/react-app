import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Group from './group.jsx';
import GraphPremise from '../SVG/GraphPremise.jsx';
import GraphConfig from 'src/stores/_graphConfig.js';

/**
 * An argument with it's own premises
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

    return (
      <Group
        className="graph-arg"
        x={this.props.argStore.x}
        y={this.props.argStore.y}
      >
        <rect
          rx="10"
          ry="10"
          x={this.props.argStore.x + GraphConfig.padding}
          y={this.props.argStore.y + GraphConfig.padding}
          width={this.props.argStore.w - (GraphConfig.padding * 2)}
          height={this.props.argStore.h - (GraphConfig.padding * 2)}
          className="grid-square"
        />
        <rect
          rx="5"
          ry="5"
          x={this.props.argStore.x + GraphConfig.padding}
          y={this.props.argStore.y + GraphConfig.padding}
          width={this.props.argStore.w - (GraphConfig.padding * 2)}
          height={this.props.argStore.h - (GraphConfig.padding * 2)}
          className="graph-arg__rect"
        />

        {premisesMarkup}

      </Group>
    );
  }
}
