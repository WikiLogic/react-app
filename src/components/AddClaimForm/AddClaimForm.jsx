import React from 'react';
import API from 'API/api';

/* Each Claim in the list of search results
 */

export default class AddClaimForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  submitHandler(event) {
    event.preventDefault();

    API.postNewClaim({ text: this.state.text })
      .then((data) => {
        console.log("api returned new claim!", data);
      }).catch((err) => {
        console.error('API returned a fail', err);
      });
  }

  render() {

    return (
      <form className="form" onSubmit={this.submitHandler}>

        <label className="form__label">
          <label className="form__label-text" htmlFor="new-claim-text">Write up your new claim</label>
          <textarea className="form__input" id="new-claim-text" onChange={this.handleChange} />
        </label>

        <div className="form__submit">
          <input className="form__submit-button" type="submit" value="Publish" />
        </div>
      </form>
    );
  }
}