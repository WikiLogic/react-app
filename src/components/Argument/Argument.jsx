import React from 'react';
import PropTypes from 'prop-types';
import Claim from '../Claim/Claim.jsx';

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
      return (
        <div className="argument__premis" key={premis.id}>
          <Claim
            claim={premis}
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
  premisClickHandler: PropTypes.func.isRequired,
  argumentObject: PropTypes.shape({
    type: PropTypes.string.isRequired,
    premises: PropTypes.array.isRequired,
  }).isRequired
};
