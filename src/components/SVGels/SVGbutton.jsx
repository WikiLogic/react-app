import React from 'react';
//import SVGbutton from 'WlComponents/SVGels/SVGbutton.jsx';

/* SVG does not provide native buttons
 * That's what this component is for!
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

  render() {
    return (
      <g
        className="button"
        cursor="pointer"
        onClick={() => { this.buttonAction('NotNull'); }}
      >
        <rect
          x="-25"
          y="40"
          width="50"
          height="50"
          stroke="black"
          fill="White"
        />
        <text x="0" y="80">+</text>
      </g>
    );
  }
}

ButtonSVG.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  buttonAction: React.PropTypes.func.isRequired
};
