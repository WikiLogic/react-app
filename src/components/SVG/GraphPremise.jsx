import React from 'react';
import PropTypes from 'prop-types';
import SVGbutton from '../SVGels/SVGbutton.jsx';
import SVGtext from '../SVGels/SVGtext.jsx';
import GraphArg from '../SVG/GraphArg.jsx';
import ClickerDragger from '../ClickerDragger/ClickerDragger.jsx';
import API from '../../api.js';

/* The Claim Wrapper for the graph
 * It doesn't need to know where it is on the graph, that's handled by whoever the parent is (probably the graph scene)
 * But it does need to know where it wants to put it's children and then inform the parent about it's size. 
 * It's then up to the parent to accomodate properly.
 */
export default class GraphPremise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claim: this.props.claim,
      arguments: [],
      dupeClaim: null
    };
    this.dupeClaim = this.dupeClaim.bind(this);
    this.renderArguments = this.renderArguments.bind(this);
  }

  dupeClaim() {
    API.getClaimDetailById(this.props.claim._key)
      .then((data) => {
        this.setState({
          dupeClaim: data.claim
        });
      }).catch((err) => {
        console.log('Trying to load claim detail error', err);
      });
  }

  //will need a:
  //this.props.resizeHandler

  renderArguments() {
    if (this.state.arguments.length === 0) { return null; }
    const argumentsMarkup = [];
    let premiseCounter = 0;

    for (let r = 0; r < this.state.arguments.length; r++) {
      const thisArgumentX = premiseCounter * this.props.gridUnit; //move it right by n previous premises * the gridUnit
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
        x={-this.props.padUnit} //something's acting relative in the svg
        y={this.props.gridUnit}
      >
        {argumentsMarkup}
      </ClickerDragger>
    );
  }

  render() {

    //make premises 2 by 1
    const premiseWidth = (this.props.gridUnit * 2) - (4 * this.props.padUnit); //premises sit on the innermost box
    const premiseHeight = (this.props.gridUnit * 1) - (4 * this.props.padUnit);


    console.log('this.props.claim', this.props.claim);

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
          text={this.props.claim.text}
        />

        <SVGbutton
          clickHandler={this.dupeClaim}
          text=" "
          x={premiseWidth - 44}
          y={premiseHeight - 44}
        />
      </g>
    );
  }
}

GraphPremise.propTypes = {
  claim: PropTypes.shape({
    text: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    _key: PropTypes.string.isRequired
  }).isRequired,
  gridUnit: PropTypes.number.isRequired,
  padUnit: PropTypes.number.isRequired
};
