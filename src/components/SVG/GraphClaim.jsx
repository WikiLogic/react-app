import React from 'react';
import PropTypes from 'prop-types';
import SVGbutton from '../SVGels/SVGbutton.jsx';
import SVGtext from '../SVGels/SVGtext.jsx';
import GraphArg from '../SVG/GraphArg.jsx';
import ClickerDragger from '../ClickerDragger/ClickerDragger.jsx';
// import API from '../../api.js';

/* The Claim Wrapper for the graph
 * It doesn't need to know where it is on the graph, that's handled by whoever the parent is (probably the graph scene)
 * But it does need to know where it wants to put it's children and then inform the parent about it's size. 
 * It's then up to the parent to accomodate properly.
 */
export default class GraphClaim extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    gridUnit: PropTypes.number.isRequired,
    padUnit: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };

    this.renderArguments = this.renderArguments.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.setState({
      isFocused: true
    });
  }

  renderArguments() {
    if (this.props.store.args.length === 0) { return null; }
    const argumentsMarkup = [];

    this.props.store.args.forEach((arg) => {
      argumentsMarkup.push(
        <ClickerDragger
          key={arg._id}
          x={arg.x}
          y={0}
        >
          <GraphArg
            key={arg._id}
            gridUnit={this.props.gridUnit}
            padUnit={this.props.padUnit}
            arg={arg}
          />
        </ClickerDragger>
      );
    });

    //The arguments area will fill the grid squares 
    //it's up to the individual arguments to position themselves within the grid squares
    return (
      <ClickerDragger
        className="graph-claim__args"
        x={0} //something's acting relative in the svg
        y={this.props.gridUnit}
      >
        <g>{argumentsMarkup}</g>
      </ClickerDragger>
    );
  }

  render() {
    console.log('this.props.store.claim', this.props.store.claim);

    //make claims 2 by 1
    const claimWidth = (this.props.gridUnit * 2) - (2 * this.props.padUnit);
    const claimHeight = (this.props.gridUnit * 1) - (2 * this.props.padUnit);
    const gridSquareWidth = this.props.gridUnit * 2;
    const gridSquareHeight = this.props.gridUnit * 1;

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
          x={this.props.padUnit}
          y={this.props.padUnit}
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
              text={this.props.store.claim.text}
            />

            {(this.state.isFocused &&
              <SVGbutton
                clickHandler={() => {
                  this.props.store.loadArgs();
                }}
                text="+"
                x={claimWidth - 44}
                y={claimHeight - 44}
              />
            )}
          </g>
        </ClickerDragger>

        {/* {this.renderArguments()} */}
      </g>
    );
  }
}
