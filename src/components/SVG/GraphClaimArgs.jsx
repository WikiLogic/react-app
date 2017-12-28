import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import SVGbutton from '../SVGels/SVGbutton.jsx';
// import SVGtext from '../SVGels/SVGtext.jsx';
import GraphArg from '../SVG/GraphArg.jsx';
import Group from './group.jsx';

@observer
export default class GraphClaimArgs extends React.Component {
  static propTypes = {
    claimStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.claimStore.args.length === 0) { return null; }
    const argumentsMarkup = [];

    this.props.claimStore.args.forEach((arg) => {
      console.log('GraphClaimArg JSX arg: ', arg);
      argumentsMarkup.push(
        <Group
          key={arg._id}
          x={arg.x}
          y={0}
        >
          <GraphArg
            key={arg._id}
            graphConfig={this.props.graphConfig}
            argStore={arg}
          />
        </Group>
      );
    });

    return (
      <Group
        className="graph-claim__args"
        x={0} //something's acting relative in the svg
        y={this.props.graphConfig.gridUnit}
      >
        <g>{argumentsMarkup}</g>
      </Group>
    );
  }
}
