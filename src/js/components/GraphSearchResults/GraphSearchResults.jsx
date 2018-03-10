import React from "react";
import PropTypes from "prop-types";
// import { action } from 'mobx';
import { observer } from "mobx-react";
import Claim from "src/components/Claim/Claim.jsx";
import AddClaimForm from "src/components/AddClaimForm/AddClaimForm.jsx";
import DetailModalIcon from "src/components/_Icons/DetailModal.svg.jsx";
import GraphIcon from "src/components/_Icons/Graph.svg.jsx";

/**
 * The Argument Premises
 * Displays the claims that have been selected to be a part of the new argument.
 */

@observer
export default class GraphSearchResults extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        resultClickHandler: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.resultClickHandler = this.resultClickHandler.bind(this);
    }

    resultClickHandler(claim) {
        this.props.resultClickHandler(claim);
    }

    render() {
        let newClaimMarkup = null;

        if (this.props.store.results.length === 0 && this.props.store.searchHasRun) {
            newClaimMarkup = (
                <div>
                    <p>No results for {this.props.store.term}</p>
                    <div className="pad" />
                    <AddClaimForm
                        // newClaimStore={new NewClaimStore(this.props.store.term)}
                        newClaimStore={this.props.store.NewClaimStore}
                        initText={this.props.store.term}
                    />
                </div>
            );
        }

        const premisesMarkup = [];
        for (let r = 0; r < this.props.store.results.length; r++) {
            premisesMarkup.push(
                <div key={this.props.store.results[r]._id} className="graph-search-results__result">
                    <Claim claim={this.props.store.results[r]} isSelected={false}>
                        <div>
                            <button
                                className="xbutton--secondary button--icon"
                                onClick={() => {
                                    window.wl.claimDetailModal.openClaim(
                                        this.props.store.results[r]
                                    );
                                }}
                            >
                                <DetailModalIcon />
                            </button>
                            <span className="pad pad--half" />
                            <button
                                className="xbutton--secondary button--icon"
                                onClick={() => {
                                    this.resultClickHandler(this.props.store.results[r]);
                                }}
                            >
                                <GraphIcon />
                            </button>
                        </div>
                    </Claim>
                </div>
            );
        }

        return (
            <div className="graph-search-results">
                {newClaimMarkup}
                {premisesMarkup}
            </div>
        );
    }
}
