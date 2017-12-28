import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SVGbutton from '../SVGels/SVGbutton.jsx';
import SVGtext from '../SVGels/SVGtext.jsx';
import GraphClaimArgs from './GraphClaimArgs.jsx';
import Group from './group.jsx';

@observer
export default class GraphClaim extends React.Component {
  static propTypes = {
    claimStore: PropTypes.object.isRequired,
    graphConfig: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: true
    };

    // this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  // mouseUpHandler() {
  //   this.setState({
  //     isFocused: true
  //   });
  // }

  render() {
    //make claims 2 by 1
    const claimWidth = (this.props.graphConfig.gridUnit * 2) - (2 * this.props.graphConfig.padUnit);
    const claimHeight = (this.props.graphConfig.gridUnit * 1) - (2 * this.props.graphConfig.padUnit);
    const gridSquareWidth = this.props.graphConfig.gridUnit * 2;
    const gridSquareHeight = this.props.graphConfig.gridUnit * 1;

    return (
      <Group
        className="graph-claim"
        x={this.props.x}
        y={this.props.y}
      >
        <rect
          className="grid-square"
          rx="10"
          ry="10"
          width={gridSquareWidth}
          height={gridSquareHeight}
        />

        <Group
          className="graph-claim__claim"
          x={this.props.graphConfig.padUnit}
          y={this.props.graphConfig.padUnit}
        >
          <rect
            rx="5"
            ry="5"
            width={claimWidth}
            height={claimHeight}
            className="graph-claim__claim"
          />

          <SVGtext
            x={0}
            y={0}
            width={claimWidth}
            height={claimHeight}
            text={this.props.claimStore.claim.text}
          />

          {(this.state.isFocused &&
            <SVGbutton
              clickHandler={() => {
                this.props.claimStore.loadArgs();
              }}
              text="+"
              x={claimWidth - 44}
              y={claimHeight - 44}
            />
          )}
        </Group>

        <GraphClaimArgs
          claimStore={this.props.claimStore}
          graphConfig={this.props.graphConfig}
        />
      </Group>
    );
  }
}
