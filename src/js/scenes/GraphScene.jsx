import React from "react";
import PropTypes from "prop-types";
import { action } from "mobx";
import { observer } from "mobx-react";

import API from "src/API/api.js";

import SearchForm from "src/components/SearchForm/SearchForm.jsx";
import GraphSearchResults from "src/components/GraphSearchResults/GraphSearchResults.jsx";
// import ArgumentBuilder from 'src/components/ArgumentBuilder/ArgumentBuilder.jsx';
// import ClickerDragger from 'src/components/ClickerDragger/ClickerDragger.jsx';
import GraphSvg from "src/components/SVG/GraphSvg.jsx";
import Graph from "src/components/SVG/Graph.jsx";
import SVGtext from "src/components/SVGels/SVGtext.jsx";

/**
 * The Home page
 * @prop {*} name
 */

@observer
export default class GraphScene extends React.Component {
    static propTypes = {
        graphSceneStore: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.loadClaim = this.loadClaim.bind(this);
        this.newArgumentSubmissionHandler = this.newArgumentSubmissionHandler.bind(this);
    }

    @action
    loadClaim(result) {
        this.props.graphSceneStore.loadClaim(result);
    }

    newArgumentSubmissionHandler(newArgument) {
        const premiseIds = [];
        newArgument.premises.each(premise => {
            premiseIds.push(premise._id);
        });
        API.postNewArgument({
            parentClaimId: this.state.claim._id,
            type: newArgument.type,
            premiseIds: premiseIds
        })
            .then(res => {
                this.setState({
                    claims: res.data.claim
                });
            })
            .catch(err => {
                console.error("new argument failed", err);
            });
    }

    render() {
        return (
            <div className="page">
                <div className="page__header">
                    <div className="max-width-wrap">
                        <SearchForm
                            store={this.props.graphSceneStore.searchStore}
                            placeholder="Search Claims"
                            id="graph-scene-search-input"
                        />
                    </div>
                </div>
                <div className="page__body no-padding">
                    <div className="sidebar-layout">
                        <div className="sidebar-layout__side">
                            <GraphSearchResults
                                store={this.props.graphSceneStore.searchStore}
                                resultClickHandler={this.loadClaim}
                            />
                            {/* <ArgumentBuilder submissionHandler={this.newArgumentSubmissionHandler} /> */}
                        </div>

                        <div className="sidebar-layout__main no-padding">
                            <GraphSvg>
                                {this.props.graphSceneStore.hasGraphData && (
                                    <Graph store={this.props.graphSceneStore.graphStore} />
                                )}
                                {!this.props.graphSceneStore.hasGraphData && (
                                    <SVGtext
                                        text="Message to search claims and click them to load into this graph. Also a button to load an example"
                                        x={0}
                                        y={0}
                                        width={400}
                                        height={20}
                                    />
                                )}
                            </GraphSvg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
