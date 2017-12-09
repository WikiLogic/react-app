import React from 'react';
import InputRange from 'WlComponents/_Atoms/InputRange.jsx';

/* Each Claim in the list of search results
 */

export default class AddClaimForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: 50,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleProbabilityUpdate = this.handleProbabilityUpdate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  handleProbabilityUpdate(newProbability) {
    this.setState({
      probability: newProbability,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.submitHandler({
      text: this.state.text,
      probability: this.state.probability,
    });
  }

  render() {
    return (
      <form className="form" onSubmit={this.submitHandler}>

        <div className="form__label">
          <label className="form__label-text" htmlFor="new-claim-text">
            {this.props.textboxLabel}
          </label>
          <textarea className="form__input" id="new-claim-text" onChange={this.handleChange} />
          {(this.props.showValueSetter &&
            <InputRange
              id="new-claim-value"
              initValue={Number(this.state.probability)}
              labelText="Assign a value"
              changeHandler={this.handleProbabilityUpdate}
            />
          )}
        </div>

        <div className="form__submit text-right">
          <input className="form__submit-button" type="submit" value={this.props.submitBtnLabel} />
        </div>
      </form>
    );
  }
}

AddClaimForm.propTypes = {
  submitHandler: React.PropTypes.func.isRequired,
  textboxLabel: React.PropTypes.string,
  submitBtnLabel: React.PropTypes.string,
  showValueSetter: React.PropTypes.bool
};

AddClaimForm.defaultProps = {
  textboxLabel: 'Write up your new claim',
  submitBtnLabel: 'Publish',
  showValueSetter: false
};

