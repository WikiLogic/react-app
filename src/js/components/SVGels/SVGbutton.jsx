import React from "react";
import PropTypes from "prop-types";
import ClickerDragger from "../ClickerDragger/ClickerDragger.jsx";
import SVGtext from "./SVGtext.jsx";
//import SVGbutton from '../SVGels/SVGbutton.jsx';

/* SVG does not provide native buttons
 * That's what this component is for!
 */
export default class SVGbutton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: "default"
        };

        //TODO: reflect buttons states through the styling to match normal button states
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    mouseDownHandler() {
        this.setState({
            buttonState: "down"
        });
    }

    clickHandler() {
        this.props.clickHandler();
    }

    mouseUpHandler() {
        this.setState({
            buttonState: "default"
        });
    }

    render() {
        return (
            <ClickerDragger x={this.props.x} y={this.props.y}>
                <g
                    className="button"
                    onMouseDown={this.mouseDownHandler}
                    onClick={this.clickHandler}
                    onMouseUp={this.mouseUpHandler}
                >
                    <rect x="0" y="0" rx="3" ry="3" width="44" height="44" />
                    <SVGtext x={0} y={0} width={44} height={44} text={this.props.text} />
                </g>
            </ClickerDragger>
        );
    }
}

SVGbutton.propTypes = {
    text: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired
};
