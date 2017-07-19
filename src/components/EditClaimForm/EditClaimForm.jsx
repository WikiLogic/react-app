import React from 'react';
import Claim from 'Components/Claim/Claim';

/* Each Claim in the list of search results
 */

export default class EditClaimForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(premis) {
    console.log("claim that's being edited was clicked... hmm");
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
  claim: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }).isRequired,
};
