import React from 'react';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import SVGtext from './SVGtext.jsx';
//import SVGbutton from 'WlComponents/SVGels/SVGbutton.jsx';

/* SVG does not provide native buttons
 * That's what this component is for!
 */
export default class ButtonSVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 'default'
    };
    //TODO: switch between states like 'focused' 'active' and others - update class
    this.buttonAction = this.buttonAction.bind(this);
  }

  buttonAction(premise) {
    this.props.buttonAction(premise);
  }

  render() {
    return (
      <ClickerDragger x={this.props.x} y={this.props.y}>
        <g
          className="button"
          onClick={() => { this.buttonAction('NotNull'); }}
        >
          <rect
            x="0"
            y="0"
            rx="3"
            ry="3"
            width="44"
            height="44"
          />
          <SVGtext
            x="0"
            y="0"
            width={44}
            height={44}
            text={this.props.text}
          />
        </g>
      </ClickerDragger>
    );
  }
}

ButtonSVG.propTypes = {
  text: React.PropTypes.string.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  buttonAction: React.PropTypes.func.isRequired
};
