import React from 'react';

/* 
+------------------------+
|label         +--------+|
|Input         | Button ||
|              +--------+|
+------------------------+
 */

export default class InputButton extends React.Component {
  constructor(props) {
    super(props);

    let setInputValue = '';
    if (Object.prototype.hasOwnProperty.call(props, 'inputInitValue')) {
      setInputValue = props.inputInitValue;
    } else {
      setInputValue = '';
    }

    this.state = {
      value: setInputValue,
    };

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
    });

    if (Object.prototype.hasOwnProperty.call(this.props, 'inputChangeHandler')) {
      this.props.inputChangeHandler(e.target.value);
    }
  }

  render() {
    return (
      <div className="InputButton">
        <label htmlFor={this.props.id}>
          {this.props.labelText}
        </label>

        <div className="InputButton__input">
          <input
            id={this.props.id}
            type={this.props.inputType}
            placeholder={this.props.inputPlaceholder}
            value={this.state.value}
            onChange={this.changeHandler}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.props.submitHandler(this.state.value);
              }
            }}
          />

          <button
            onClick={() => { this.props.submitHandler(this.state.value); }}
          >{this.props.btnText}</button>
        </div>
      </div>
    );
  }
}

InputButton.propTypes = {
  id: React.PropTypes.string.isRequired,
  labelText: React.PropTypes.string.isRequired,
  inputType: React.PropTypes.string.isRequired,
  inputPlaceholder: React.PropTypes.string.isRequired,
  inputInitValue: React.PropTypes.string,
  inputChangeHandler: React.PropTypes.func,
  btnText: React.PropTypes.string.isRequired,
  submitHandler: React.PropTypes.func.isRequired
};

InputButton.defaultProps = {
  inputChangeHandler: () => {},
  inputInitValue: '',
};
