import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
//import ButtonSVG from 'WlComponents/ButtonSVG/ButtonSVG.jsx';

/* The wrapper around svg elements that deals with clicking and dragging
 * Also just positioning in a standard way
 */
export default class ButtonSVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y
    };
    this.buttonAction = this.buttonAction.bind(this);
  }

  buttonAction(premise) {
    this.props.buttonAction(premise);
  }

  buttonClick() {
    console.log("I worked!");
  }

  render() {
    //not making the wrapper visible around the whole of it's children for now - that would require feedback from the children about their dimensions
    return (

      <ClickerDragger x={`${this.state.x}`} y={`${this.state.y}`}>

        <g class="button" cursor="pointer"
          onClick={() => { this.buttonAction('NotNull'); }}>
          <rect x="-25" y="40"
            width="50" height="50" stroke="black" fill="White"/>
          <text x="0" y="80">+</text>
        </g>

      </ClickerDragger>
    );
  }
}

ButtonSVG.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  buttonAction: React.PropTypes.func.isRequired
};
