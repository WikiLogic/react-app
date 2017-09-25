import React from 'react';
import Range from 'WlComponents/Range/Range.jsx';

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
    this.handleValueUpdate = this.handleValueUpdate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  handleValueUpdate(newValue) {
    this.setState({
      value: newValue,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.submitHandler({
      text: this.state.text,
      value: this.state.value,
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
            <Range
              min={1}
              max={99}
              step={1}
              value={Number(this.state.value)}
              inputId="new-claim-value"
              labelText="Assign a value"
              handleValueUpdate={this.handleValueUpdate}
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

