import React from 'react';
import Claim from 'Components/Claim/Claim';

/* An argument group
 */

export default class Argument extends React.Component {
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
        <div className="argument__premis" key={premis.id}>
          <Claim
            claim={premis}
            isSelected={isSelected}
            handleClick={() => { this.handleClick(premis); }}
          />
        </div>
      );
    });

    return (
      <div className={`argument argument--${this.props.argumentObject.type}`}>
        <div className="argument__header">
          {this.props.argumentObject.type}
        </div>
        <div className="argument__body">
          {premises}
        </div>
      </div>
    );
  }
}

Argument.propTypes = {
  premisClickHandler: React.PropTypes.func.isRequired,
  argumentObject: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    premises: React.PropTypes.array.isRequired,
  }).isRequired,
  highlightedPremisId: React.PropTypes.string.isRequired,
};
