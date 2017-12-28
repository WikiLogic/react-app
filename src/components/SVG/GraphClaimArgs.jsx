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
          key={arg.arg._id}
          x={arg.x}
          y={arg.y}
        >
          <GraphArg
            key={arg._id}
            argStore={arg}
          />
        </Group>
      );
    });

    return (
      <Group
        className="graph-claim__args"
        x={this.props.claimStore.argsX}
        y={this.props.claimStore.argsY}
      >
        <rect
          rx="5"
          ry="5"
          width={this.props.claimStore.argsW}
          height={this.props.claimStore.argsH}
          className="graph-claim__claim"
        />
        {argumentsMarkup}
      </Group>
    );
  }
}
