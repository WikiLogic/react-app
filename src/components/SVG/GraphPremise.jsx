import React from 'react';
import PropTypes from 'prop-types';
import Group from './group.jsx';
import SVGbutton from '../SVGels/SVGbutton.jsx';
import SVGtext from '../SVGels/SVGtext.jsx';

/**
 * A premise inside an argument on the graph
 */

export default class GraphPremise extends React.Component {
  static propTypes = {
    premiseStore: PropTypes.shape({
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      _key: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.openPremise = this.openPremise.bind(this);
  }

  openPremise() {
    console.log('open premise button clicked!');
  }

  render() {
    return (
      <Group
        className="graph-premise"
        x={this.props.premiseStore.x}
        y={this.props.premiseStore.y}
      >
        <rect
          width={this.props.premiseStore.w}
          height={this.props.premiseStore.h}
          className="graph-claim__claim"
        />

        <SVGtext
          x={0}
          y={0}
          width={this.props.premiseStore.w}
          height={this.props.premiseStore.h}
          text={this.props.premiseStore.text}
        />

        <SVGbutton
          clickHandler={this.openPremise}
          text="🡻"
          x={this.props.premiseStore.w - 44}
          y={this.props.premiseStore.h - 44}
        />
      </Group>
    );
  }
}
