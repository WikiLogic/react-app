import React from 'react';
import PropTypes from 'prop-types';
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
      _key: PropTypes.string.isRequired
    }).isRequired,
    graphConfig: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    };
    this.openPremise = this.openPremise.bind(this);
  }

  openPremise() {
    console.log('open premise button clicked!');
  }

  render() {

    //make premises 2 by 1
    const premiseWidth = (this.props.graphConfig.gridUnit * 2) - (4 * this.props.graphConfig.padUnit); //premises sit on the innermost box
    const premiseHeight = (this.props.graphConfig.gridUnit * 1) - (4 * this.props.graphConfig.padUnit);

    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <g className="graph-premise">
        <rect
          width={premiseWidth}
          height={premiseHeight}
          className="graph-claim__claim"
        />

        <SVGtext
          x={0}
          y={0}
          width={premiseWidth}
          height={premiseHeight}
          text={this.props.premiseStore.text}
        />

        <SVGbutton
          clickHandler={this.openPremise}
          text="🡻"
          x={premiseWidth - 44}
          y={premiseHeight - 44}
        />
      </g>
    );
  }
}
