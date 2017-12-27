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
    console.log('graph');
    return (
      <g className="graph">
        <GraphClaim
          store={this.props.store.rootClaim}
          premiseClickHandler={this.loadClaim}
          gridUnit={this.props.store.gridUnit}
          padUnit={this.props.store.padUnit}
        />
      </g>
    );
  }
}
