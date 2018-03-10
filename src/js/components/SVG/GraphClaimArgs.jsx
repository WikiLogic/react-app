import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
// import SVGbutton from '../SVGels/SVGbutton.jsx';
// import SVGtext from '../SVGels/SVGtext.jsx';
import GraphArg from "../SVG/GraphArg.jsx";
import Group from "./group.jsx";

/**
 * Wraps all the args in a claim
 * Claim
 *   ClaimArgs <- we're here
 *     Arg
 *       Premise
 */

@observer
export default class GraphClaimArgs extends React.Component {
    static propTypes = {
        claimStore: PropTypes.shape({
            argsX: PropTypes.number.isRequired,
            argsY: PropTypes.number.isRequired,
            argsW: PropTypes.number.isRequired,
            argsH: PropTypes.number.isRequired,
            args: PropTypes.object.isRequired
        }).isRequired,
        loadPremiseClickHandler: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.loadPremiseClickHandler = this.loadPremiseClickHandler.bind(this);
    }

    loadPremiseClickHandler(premiseStore) {
        this.props.loadPremiseClickHandler(premiseStore);
    }

    render() {
        if (this.props.claimStore.args.length === 0) {
            return null;
        }
        const argumentsMarkup = [];

        this.props.claimStore.args.forEach(arg => {
            argumentsMarkup.push(
                <GraphArg
                    key={arg.arg._id}
                    argStore={arg}
                    loadPremiseClickHandler={this.loadPremiseClickHandler}
                />
            );
        });

        return (
            <Group
                className="graph-claim__args"
                x={this.props.claimStore.argsX}
                y={this.props.claimStore.argsY}
            >
                <rect
                    rx="5"
                    ry="5"
                    width={this.props.claimStore.argsW}
                    height={this.props.claimStore.argsH}
                    className="graph-claim__claim"
                />
                {argumentsMarkup}
            </Group>
        );
    }
}
