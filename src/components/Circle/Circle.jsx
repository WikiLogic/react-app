import React from 'react';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* A claim
 * and all it's arguments
 * Also the options to add arguments - eventually
 */

export default class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(premis) {
    this.props.premisClickHandler(premis);
  }

  render() {
    // loop through the premises in this argument
    const premises = this.props.argumentObject.premises.map((premis) => {
      const isSelected = (premis.id === this.props.highlightedPremisId);

      return (
        <div className="argumentCircle__premis" key={premis.id}>
          <Claim
            claim={premis}
            isSelected={isSelected}
            handleClick={() => { this.handleClick(premis); }}
          />
        </div>
      );
    });

    const colour = this.props.argumentObject.probability < 50 ? 'false' : 'true';

    return (
      <div className={`argument argumentCircle--${colour}`}>
        {/* <div className="argumentCircle__header">
          {this.props.argumentObject.type}
        </div>*/}
        <div className="argumentCircle__body">
          {premises}
        </div>
      </div>
    );
  }
}

Circle.propTypes = {
  highlightedPremisId: React.PropTypes.string.isRequired,
  argumentObject: React.PropTypes.shape({
    probability: React.PropTypes.number.isRequired,
    premises: React.PropTypes.array.isRequired,
  }).isRequired,
  premisClickHandler: React.PropTypes.func.isRequired,
};
