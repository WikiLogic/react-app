import React from 'react';
import PropTypes from 'prop-types';
import SVGbutton from 'WlComponents/SVGels/SVGbutton.jsx';
import SVGtext from 'WlComponents/SVGels/SVGtext.jsx';
import GraphArg from 'WlComponents/SVG/GraphArg.jsx';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import API from 'WlAPI/api.js';

/* The Claim Wrapper for the graph
 * It doesn't need to know where it is on the graph, that's handled by whoever the parent is (probably the graph scene)
 * But it does need to know where it wants to put it's children and then inform the parent about it's size. 
 * It's then up to the parent to accomodate properly.
 */
export default class GraphClaim extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      claim: this.props.claim,
      arguments: [],
      isFocused: false
    };
    this.loadArguments = this.loadArguments.bind(this);
    this.renderArguments = this.renderArguments.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.setState({
      isFocused: true
    });
  }

  loadArguments() {
    console.log('tada! All the btn did was say, hey dad, fire that function you passed me! Dad knows what to do.', this.props.claim);
    API.getClaimDetailById(this.props.claim._key)
      .then((data) => {
        this.setState({
          arguments: data.claim.arguments
        });
      }).catch((err) => {
        console.log('Trying to load claim detail error', err);
      });
  }

  //will need a:
  //this.props.resizeHandler

  renderArguments() {
    console.log('data.state.arguments', this.state.arguments);
    if (this.state.arguments.length === 0) { return null; }
    const argumentsMarkup = [];
    let premiseCounter = 0;
    const spaceBetweenArgs = 50;

    for (let r = 0; r < this.state.arguments.length; r++) {
      const thisArgumentX = (premiseCounter * (this.props.gridUnit * 2)) + (spaceBetweenArgs * r); //move it right by n previous premises * the gridUnit, premises are 2 units wide too
      premiseCounter += this.state.arguments[r].premises.length;

      argumentsMarkup.push(
        <ClickerDragger
          key={r}
          x={thisArgumentX}
          y={0}
        >
          <GraphArg
            key={r}
            gridUnit={this.props.gridUnit}
            padUnit={this.props.padUnit}
            arg={this.state.arguments[r]}
          />
        </ClickerDragger>
      );
    }

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
              text={this.props.claim.text}
            />

            {(this.state.isFocused &&
              <SVGbutton
                clickHandler={this.loadArguments}
                text="+"
                x={claimWidth - 44}
                y={claimHeight - 44}
              />
            )}
          </g>
        </ClickerDragger>

        {this.renderArguments()}
      </g>
    );
  }
}

GraphClaim.propTypes = {
  claim: PropTypes.shape({
    text: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    _key: PropTypes.string.isRequired,
    arguments: PropTypes.array
  }).isRequired,
  gridUnit: PropTypes.number.isRequired,
  padUnit: PropTypes.number.isRequired
};
