import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import InputRange from '../_Atoms/InputRange.jsx';
import Errors from 'src/components/Alerts/Errors.jsx';

/**
 * Creating a new claim from scratch
 */

@observer
export default class AddClaimForm extends React.Component {
  static propTypes = {
    newClaimStore: PropTypes.object.isRequired,
    textboxLabel: PropTypes.string,
    submitBtnLabel: PropTypes.string
  }

  static defaultProps = {
    textboxLabel: 'Create a new claim:',
    submitBtnLabel: 'Publish'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleProbabilityUpdate = this.handleProbabilityUpdate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange(event) {
    this.props.newClaimStore.setText(event.target.value);
  }

  handleProbabilityUpdate(newProbability) {
    this.props.newClaimStore.setProbability(newProbability);
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.newClaimStore.submit();
  }

  render() {
    if (!window.wl.user.isLoggedIn) {
      return (
        <div>
          <button
            className="a"
            onClick={() => { window.wl.user.authModal = 'Login'; }}
          >Login</button> or <button
            className="a"
            onClick={() => { window.wl.user.authModal = 'Signup'; }}
          >Signup</button> to add this as a new claim.
        </div>
      );
    }
    return (
      <form className="form" onSubmit={this.submitHandler}>

        <div className="form__label">
          <label className="form__label-text" htmlFor="new-claim-text">
            {this.props.textboxLabel}
          </label>
          <textarea
            className="form__input"
            id="new-claim-text"
            onChange={this.handleChange}
            value={this.props.newClaimStore.text}
          />
        </div>

        <div className="pad" />

        <InputRange
          id="new-claim-value"
          initValue={Number(this.props.newClaimStore.probability)}
          labelText="Set your confidence:"
          changeHandler={this.handleProbabilityUpdate}
          classModifiers="InputRange--small"
        />

        <div className="pad" />

        {this.props.newClaimStore.statusMessage}

        {this.props.newClaimStore.errors.length > 0 &&
          <div>
            <Errors errors={this.props.newClaimStore.errors} />
            <div className="pad" />
          </div>
        }

        <div className="form__submit text-right">
          <input className="form__submit-button" type="submit" value={this.props.submitBtnLabel} />
        </div>
        <div className="pad" />

      </form>
    );
  }
}
