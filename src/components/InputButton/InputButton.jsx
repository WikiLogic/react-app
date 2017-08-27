import React from 'react';

/** 
 * Input Button
 * Can handle it's own updated and pass up the value on submit
 * Or it can pass up the value on change if onChange prop is provided
 */

export default class InputButton extends React.Component {
  constructor(props) {
    super(props);

    let setInputValue = '';
    if (this.props.hasOwnProperty('inputValue')) {
      setInputValue = this.props.inputValue;
    } else {
      setInputValue = '';
    }

    this.state = {
      value: setInputValue,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler() {
    this.props.submitHandler(this.state.value);
  }

  inputUpdateHandler(event) {
    if (this.props.hasOwnProperty('onChange')) {

      this.props.onChange(event.target.value);
    } else {
      this.setState({
        value: event.target.value,
      });
    }
  }

  render() {
    return (
      <div className="input-button">
        <input
          type={this.props.inputType}
          value={this.state.value}
          onChange={this.inputUpdateHandler}
        />
        <button>{this.props.buttonText}</button>
      </div>
    );
  }
}

InputButton.propTypes = {
  inputType: React.PropTypes.string.isRequired,
  buttonText: React.PropTypes.string.isRequired,
  submitHandler: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func,
  inputValue: React.PropTypes.string,
};
