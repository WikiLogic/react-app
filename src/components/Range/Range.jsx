import React from 'react';

/* Alerts / messages / updates / notes - fire them in here!
 * This is the bar that sits at the bottom of the screen
 */
export default class Range extends React.Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(event) {
    let newValue = this.props.value;
    if (typeof event === 'boolean') {
      if (event) {
        newValue += this.props.step;
      } else {
        newValue -= this.props.step;
      }
    }

    if (typeof event === 'object') {
      newValue = event.target.value;
    }

    if (newValue > this.props.max) {
      newValue = this.props.max;
    }

    if (newValue < this.props.min) {
      newValue = this.props.min;
    }

    this.props.handleValueUpdate(newValue);
  }

  render() {
    const left = (this.props.value / this.props.max) * 100;

    return (
      <div className="range">
        <label htmlFor={this.props.inputId}>{this.props.labelText}</label>
        <div className="range__slider">
          <button className="range__button" onClick={() => { this.updateValue(false); }}>-</button>
          <div className="range__bar">
            <div className="range__dragger" style={{ left: `${left}%` }} />
          </div>
          <button className="range__button" onClick={() => { this.updateValue(true); }}>+</button>
        </div>
        <input
          className="range__input"
          type="number"
          id={this.props.inputId}
          value={this.props.value}
          onChange={this.updateValue}
        />
      </div>
    );
  }
}

Range.propTypes = {
  max: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  step: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  inputId: React.PropTypes.string.isRequired,
  labelText: React.PropTypes.string.isRequired,
  handleValueUpdate: React.PropTypes.func.isRequired,
};
