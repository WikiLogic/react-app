import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import GraphClaim from 'src/components/SVG/GraphClaim.jsx';

@observer
export default class Graph extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      rootClaim: PropTypes.shape({
        claim: PropTypes.shape({
          text: PropTypes.string.isRequired,
          _id: PropTypes.string.isRequired,
          _key: PropTypes.string.isRequired
        }),
        args: PropTypes.object.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        w: PropTypes.number.isRequired,
        h: PropTypes.number.isRequired,
        padding: PropTypes.number.isRequired
      }).isRequired
    }).isRequired,
  };

  render() {
    return (
      <g className="graph">
        <GraphClaim
          claimStore={this.props.store.rootClaim}
        />
      </g>
    );
  }
}
