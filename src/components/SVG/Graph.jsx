import React from 'react';
import PropTypes from 'prop-types';
// import { action } from 'mobx';
import { observer } from 'mobx-react';

import GraphClaim from 'src/components/SVG/GraphClaim.jsx';

@observer
export default class Graph extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <g className="graph">
        <GraphClaim
          x={0}
          y={0}
          claimStore={this.props.store.rootClaim}
          graphConfig={this.props.store.graphConfig}
        />
      </g>
    );
  }
}
