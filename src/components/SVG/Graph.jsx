import React from 'react';
import PropTypes from 'prop-types';
// import { action } from 'mobx';
import { observer } from 'mobx-react';

import ClickerDragger from '../ClickerDragger/ClickerDragger.jsx';
import GraphClaim from 'src/components/SVG/GraphClaim.jsx';

@observer
export default class Graph extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <g className="graph">
        <ClickerDragger key="root" x={0} y={0} >
          <GraphClaim
            store={this.props.store.rootClaim}
            graphConfig={this.props.store.graphConfig}
          />
        </ClickerDragger>
      </g>
    );
  }
}
