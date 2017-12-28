import React from 'react';
import PropTypes from 'prop-types';
// import SVGbutton from '../SVGels/SVGbutton.jsx';
// import SVGtext from '../SVGels/SVGtext.jsx';
import GraphArg from '../SVG/GraphArg.jsx';
import ClickerDragger from '../ClickerDragger/ClickerDragger.jsx';

export default class GraphClaimArgs extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    graphConfig: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.store.args.length === 0) { return null; }
    const argumentsMarkup = [];

    this.props.store.args.forEach((arg) => {
      console.log('GraphClaimArg JSX arg: ', arg);
      argumentsMarkup.push(
        <ClickerDragger
          key={arg._id}
          x={arg.x}
          y={0}
        >
          <GraphArg
            key={arg._id}
            graphConfig={this.props.graphConfig}
            arg={arg}
          />
        </ClickerDragger>
      );
    });

    return (
      <ClickerDragger
        className="graph-claim__args"
        x={0} //something's acting relative in the svg
        y={this.props.graphConfig.gridUnit}
      >
        <g>{argumentsMarkup}</g>
      </ClickerDragger>
    );
  }
}
