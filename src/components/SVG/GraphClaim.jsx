import React from 'react';
import PropTypes from 'prop-types';
import SVGbutton from '../SVGels/SVGbutton.jsx';
import SVGtext from '../SVGels/SVGtext.jsx';
import GraphClaimArgs from './GraphClaimArgs.jsx';
import ClickerDragger from '../ClickerDragger/ClickerDragger.jsx';
// import API from '../../api.js';

/* The Claim Wrapper for the graph
 * It doesn't need to know where it is on the graph, that's handled by whoever the parent is (probably the graph scene)
 * But it does need to know where it wants to put it's children and then inform the parent about it's size. 
 * It's then up to the parent to accomodate properly.
 */
export default class GraphClaim extends React.Component {
  static propTypes = {
    claimStore: PropTypes.object.isRequired,
    graphConfig: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };

    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.setState({
      isFocused: true
    });
  }

  render() {
    console.log('this.props.store.claim', this.props.claimStore.claim);

    //make claims 2 by 1
    const claimWidth = (this.props.graphConfig.gridUnit * 2) - (2 * this.props.graphConfig.padUnit);
    const claimHeight = (this.props.graphConfig.gridUnit * 1) - (2 * this.props.graphConfig.padUnit);
    const gridSquareWidth = this.props.graphConfig.gridUnit * 2;
    const gridSquareHeight = this.props.graphConfig.gridUnit * 1;

    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (
      <g className="graph-claim" onMouseUp={this.mouseUpHandler}>
        <rect
          className="grid-square"
          rx="10"
          ry="10"
          width={gridSquareWidth}
          height={gridSquareHeight}
        />

        <ClickerDragger
          className="graph-claim__claim"
          x={this.props.graphConfig.padUnit}
          y={this.props.graphConfig.padUnit}
        >
          <g>
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
          </g>
        </ClickerDragger>

        <GraphClaimArgs
          claimStore={this.props.claimStore}
          graphConfig={this.props.graphConfig}
        />
      </g>
    );
  }
}
