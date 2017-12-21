import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import API from '../API/api.js';

import SearchForm from '../components/SearchForm/SearchForm.jsx';
import GraphSearchResults from '../components/GraphSearchResults/GraphSearchResults.jsx';
// import ArgumentBuilder from '../components/ArgumentBuilder/ArgumentBuilder.jsx';
// import ClickerDragger from '../components/ClickerDragger/ClickerDragger.jsx';
import GraphSvg from '../components/SVG/GraphSvg.jsx';
import GraphClaim from '../components/SVG/GraphClaim.jsx';
import SVGtext from '../components/SVGels/SVGtext.jsx';

/**
 * The Home page
 * @prop {*} name 
 */

@observer
export default class GraphScene extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      gridUnit: 100,
      padUnit: 4
    };

    this.loadClaim = this.loadClaim.bind(this);
    this.newArgumentSubmissionHandler = this.newArgumentSubmissionHandler.bind(this);
  }

  @action
  loadClaim(result) {
    this.props.store.loadClaim(result);
  }

  newArgumentSubmissionHandler(newArgument) {
    console.log('new argument submission!', newArgument);
    const premiseIds = [];
    newArgument.premises.each((premise) => {
      console.log('premise', premise);
      premiseIds.push(premise._id);
    });
    console.log('premiseIds', premiseIds);
    API.postNewArgument({
      parentClaimId: this.state.claim._id,
      type: newArgument.type,
      premiseIds: premiseIds
    }).then((res) => {
      console.log('claim with new argument returned!', res);
      this.setState({
        claims: res.data.claim
      });
    }).catch((err) => {
      console.error('new argument failed', err);
    });
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <SearchForm
              store={this.props.store.searchStore}
              placeholder="Search Claims"
              label="Search"
              id="graph-scene-search-input"
            />

          </div>
        </div>
        <div className="page__body no-padding">
          <div className="sidebar-layout">

            <div className="sidebar-layout__side padding">
              <GraphSearchResults
                store={this.props.store.searchStore}
                resultClickHandler={this.loadClaim}
              />
              {/* <ArgumentBuilder submissionHandler={this.newArgumentSubmissionHandler} /> */}
            </div>

            <div className="sidebar-layout__main no-padding">
              <GraphSvg>

                {(this.props.store.hasGraphData &&
                  <GraphClaim
                    store={this.props.store.graphClaimStore}
                    premiseClickHandler={this.loadClaim}
                    gridUnit={this.state.gridUnit}
                    padUnit={this.state.padUnit}
                  />
                )}
                {(!this.props.store.hasGraphData &&
                  <SVGtext
                    text="Message to search claims and click them to load into this graph. Also a button to load an example"
                    x={-200}
                    y={-300}
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
