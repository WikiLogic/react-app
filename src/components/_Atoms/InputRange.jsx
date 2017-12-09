import React from 'react';

export default class InputRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initValue,
      preDragValue: props.initValue,
      originX: 0,
      barWidth: 100,
      dragDivider: 10
    };

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragHandler = this.dragHandler.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.renderBarHandler = this.renderBarHandler.bind(this);
  }

  dragStartHandler(e) {
    this.setState({
      originX: e.screenX,
      preDragValue: this.state.value
    });
  }

  dragHandler(e) {
    if (e.screenX === 0) {
      return;
    }
    let newValue = Math.ceil(this.state.preDragValue + ((e.screenX - this.state.originX) / this.state.dragDivider));

    if (newValue > this.props.max) {
      newValue = this.props.max;
    }

    if (newValue < this.props.min) {
      newValue = this.props.min;
    }

    this.setState({
      value: newValue
    });
  }

  updateValue(event) {
    let newValue = this.state.value;

    //The + - buttons return true / false
    if (typeof event === 'boolean') {
      if (event) {
        newValue += this.props.step;
      } else {
        newValue -= this.props.step;
      }
    }

    //The default input type="number" arrow clicks return an object
    if (typeof event === 'object') {
      newValue = event.target.value;
    }

    if (newValue > this.props.max) {
      newValue = this.props.max;
    }

    if (newValue < this.props.min) {
      newValue = this.props.min;
    }

    this.setState({
      value: Number(newValue)
    });

    this.props.changeHandler(Number(newValue));
  }

  renderBarHandler(barEl) {
    if (barEl) {
      console.log('barEl.offsetWidth / (this.props.max - this.props.min)', barEl.offsetWidth / (this.props.max - this.props.min));
      this.setState({
        dragDivider: barEl.offsetWidth / (this.props.max - this.props.min)
      });
    }
  }

  render() {
    const left = (this.state.value / this.props.max) * 100;

    return (
      <div
        className="InputRange"
      >
        <label htmlFor={this.props.id}>{this.props.labelText}</label>
        <div className="InputRange__input">

          <div className="InputRange__slider">
            <button onClick={() => { this.updateValue(false); }}>-</button>
            <div
              className="InputRange__bar"
              ref={this.renderBarHandler}
            >
              <div
                draggable="true"
                onDragStart={this.dragStartHandler}
                onDrag={this.dragHandler}
                className="InputRange__dragger"
                style={{ left: `${left}%` }}
              />
            </div>
            <button onClick={() => { this.updateValue(true); }}>+</button>
          </div>

          <input
            type="number"
            id={this.props.id}
            value={this.state.value}
            onChange={this.updateValue}
          />
        </div>
      </div>
    );
  }
}

InputRange.propTypes = {
  id: React.PropTypes.string.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  initValue: React.PropTypes.number,
  labelText: React.PropTypes.string.isRequired,
  changeHandler: React.PropTypes.func.isRequired,
};

InputRange.defaultProps = {
  min: 1,
  max: 99,
  step: 1,
  initValue: 50
};
