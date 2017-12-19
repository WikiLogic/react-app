import React from 'react';
import PropTypes from 'prop-types';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* The Argument Premises
 * Displays the claims that have been selected to be a part of the new argument.
 */
export default class ArgumentPremises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.removePremiseClickHandler = this.removePremiseClickHandler.bind(this);
  }

  removePremiseClickHandler(premise) {
    this.props.removePremise(premise);
  }

  render() {
    if (!this.props.premises) {
      return <p>No results</p>;
    }

    if (this.props.premises.length === 0) {
      return <p>No results</p>;
    }

    const premisesMarkup = [];
    for (let r = 0; r < this.props.premises.length; r++) {
      premisesMarkup.push(
        <div key={this.props.premises[r]._id} className="argument-premises__premise">
          <Claim claim={this.props.premises[r]} isSelected={false}>
            <button
              className="button--secondary"
              onClick={() => {
                this.removePremiseClickHandler(this.props.premises[r]);
              }}
            >Remove</button>
          </Claim>
        </div>
      );
    }

    return (
      <div className="argument-premises">
        {premisesMarkup}
      </div>
    );
  }
}

ArgumentPremises.propTypes = {
  premises: PropTypes.arrayOf(PropTypes.object),
  removePremise: PropTypes.func.isRequired
};

ArgumentPremises.defaultProps = {
  premises: [],
};
