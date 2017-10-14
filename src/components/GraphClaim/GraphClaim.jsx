import React from 'react';
import SVGbutton from 'WlComponents/SVGels/SVGbutton.jsx';
import SVGtext from 'WlComponents/SVGels/SVGtext.jsx';
import GraphArg from 'WlComponents/GraphArg/GraphArg.jsx';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';

/* The Claim Wrapper for the graph
 * It doesn't need to know where it is on the graph, that's handled by whoever the parent is (probably the graph scene)
 * But it does need to know where it wants to put it's children and then inform the parent about it's size. 
 * It's then up to the parent to accomodate properly.
 */
export default class GraphClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claim: this.props.claim,
      arguments: []
    };
    this.expandArgumentsClickHandler = this.expandArgumentsClickHandler.bind(this);
    this.renderArguments = this.renderArguments.bind(this);
  }

  expandArgumentsClickHandler() {
    this.setState({
      arguments: this.state.claim.arguments
    });
  }

  //will need a:
  //this.props.resizeHandler

  renderArguments() {
    if (this.state.arguments.length === 0) { return null; }
    const argumentsMarkup = [];
    let premiseCounter = 0;

    for (let r = 0; r < this.state.arguments.length; r++) {
      const thisArgumentX = premiseCounter * (this.props.gridUnit * 2); //move it right by n previous premises * the gridUnit, premises are 2 units wide too
      premiseCounter += this.state.arguments[r].premises.length;
      console.log("premiseCounter", premiseCounter);

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
        {argumentsMarkup}
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
      <g className="graph-claim">
        <rect
          rx="10"
          ry="10"
          width={gridSquareWidth}
          height={gridSquareHeight}
          className="grid-square"
        />

        <ClickerDragger
          className="graph-claim__claim"
          x={this.props.padUnit}
          y={this.props.padUnit}
        >
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

          {(this.props.claim.arguments.length > 0 &&
            <SVGbutton
              buttonAction={this.expandArgumentsClickHandler}
              text="+"
              x={claimWidth - 44}
              y={claimHeight - 44}
            />
          )}
        </ClickerDragger>

        {this.renderArguments()}
      </g>
    );
  }
}

GraphClaim.propTypes = {
  claim: React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    _id: React.PropTypes.string.isRequired,
    arguments: React.PropTypes.array
  }).isRequired,
  gridUnit: React.PropTypes.number.isRequired,
  padUnit: React.PropTypes.number.isRequired
};
