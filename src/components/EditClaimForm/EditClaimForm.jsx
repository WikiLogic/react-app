import React from 'react';
import PropTypes from 'prop-types';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* Each Claim in the list of search results
 */

export default class EditClaimForm extends React.Component {
  constructor(props) {
    super(props);
    this.makeEsLintHappy = 0;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(premis) {
    this.makeEsLintHappy = premis;
  }

  render() {
    return (
      <form className="form">
        <h4 className="form__title">
          Edit claim
        </h4>

        <Claim claim={this.props.claim} handleClick={this.handleClick} />

        <label className="form__label" htmlFor="edit-claim-textarea">
          <div className="form__label-text">Claim text</div>
          <textarea className="form__input" id="edit-claim-textarea">
            text area
          </textarea>
        </label>

        <div className="form__submit">
          <input className="form__submit-button" type="submit" value="submit" />
        </div>
      </form>
    );
  }
}

EditClaimForm.propTypes = {
  claim: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
  }).isRequired,
};
