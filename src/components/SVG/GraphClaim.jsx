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
    claimStore: PropTypes.object.isRequired
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
    return (
      <Group
        className="graph-claim"
        x={this.props.claimStore.x}
        y={this.props.claimStore.y}
      >

        <Group
          className="graph-claim__claim"
          x={this.props.claimStore.padding}
          y={this.props.claimStore.padding}
        >
          <rect
            rx="5"
            ry="5"
            width={this.props.claimStore.w}
            height={this.props.claimStore.h}
            className="graph-claim__claim"
          />

          <SVGtext
            x={0}
            y={0}
            width={this.props.claimStore.w}
            height={this.props.claimStore.h}
            text={this.props.claimStore.claim.text}
          />

          {(this.state.isFocused &&
            <SVGbutton
              clickHandler={() => {
                this.props.claimStore.loadArgs();
              }}
              text="+"
              x={this.props.claimStore.w - 44}
              y={this.props.claimStore.h - 44}
            />
          )}
        </Group>

        <GraphClaimArgs
          claimStore={this.props.claimStore}
        />
      </Group>
    );
  }
}
