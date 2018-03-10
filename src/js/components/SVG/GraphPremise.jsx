import React from "react";
import PropTypes from "prop-types";
import Group from "./group.jsx";
import SVGbutton from "../SVGels/SVGbutton.jsx";
import SVGtext from "../SVGels/SVGtext.jsx";
import GraphConfig from "src/stores/_graphConfig.js";

/**
 * A premise inside an argument on the graph
 */

export default class GraphPremise extends React.Component {
    static propTypes = {
        premiseStore: PropTypes.shape({
            text: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
            _key: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            w: PropTypes.number.isRequired,
            h: PropTypes.number.isRequired
        }).isRequired,
        loadPremiseClickHandler: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.openPremise = this.openPremise.bind(this);
    }

    openPremise() {
        this.props.loadPremiseClickHandler(this.props.premiseStore);
    }

    render() {
        return (
            <Group
                className="graph-premise"
                x={this.props.premiseStore.x}
                y={this.props.premiseStore.y}
            >
                <rect
                    x={GraphConfig.padding * 2}
                    y={GraphConfig.padding * 2}
                    width={this.props.premiseStore.w - GraphConfig.padding * 4}
                    height={this.props.premiseStore.h - GraphConfig.padding * 4}
                    className="graph-claim__claim"
                />

                <SVGtext
                    x={GraphConfig.padding * 2}
                    y={GraphConfig.padding * 2}
                    width={this.props.premiseStore.w - GraphConfig.padding * 4}
                    height={this.props.premiseStore.h - GraphConfig.padding * 4}
                    text={this.props.premiseStore.text}
                />

                <SVGbutton
                    clickHandler={this.openPremise}
                    text="🡻"
                    x={this.props.premiseStore.w - 50}
                    y={this.props.premiseStore.h - 50}
                />
            </Group>
        );
    }
}
