import React from 'react';
import _ from 'lodash';

import API from 'WlAPI/api.js';

import SearchInput from 'WlComponents/SearchInput/SearchInput.jsx';
import GraphSearchResults from 'WlComponents/GraphSearchResults/GraphSearchResults.jsx';
// import ArgumentBuilder from 'WlComponents/ArgumentBuilder/ArgumentBuilder.jsx';
import GraphSvg from 'WlComponents/GraphSvg/GraphSvg.jsx';
import GraphClaim from 'WlComponents/GraphClaim/GraphClaim.jsx';
import GraphArg from 'WlComponents/GraphArg/GraphArg.jsx';

/**
 * The Home page
 * @prop {*} name 
 */
export default class GraphScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: [],
      numberOfArgsInGroup: 2,
      claimSize: 20,
      claimText: 'change',
      graphClaim: null,
      arguments: null
    };

    this.searchClaims = this.searchClaims.bind(this);
    this.resultClickHandler = this.resultClickHandler.bind(this);
    this.newArgumentSubmissionHandler = this.newArgumentSubmissionHandler.bind(this);
  }

  searchClaims(search) {
    // run the search
    if (isNaN(search)) {
      API.searchClaimsByTerm(search)
        .then((data) => {
          this.setState({
            searchResults: data.results,
            isLoading: false
          });
        }).catch((err) => {
          this.setState({
            searchResults: null,
            isLoading: false
          });
          console.log('error', err);
        });
    } else {
      API.getClaimDetailById(search)
        .then((data) => {
          this.setState({
            searchResults: [data.claim],
            isLoading: false
          });
        }).catch((err) => {
          this.setState({
            searchResults: null,
            isLoading: false
          });
          console.log('error', err);
        });
    }

    // set the state
    this.setState({
      searchTerm: search,
      isLoading: true
    });
  }

  resultClickHandler(result) {
    console.log('result to load onto graph: ', result);
    this.setState({
      graphClaim: result
    });
  }

  newArgumentSubmissionHandler(newArgument) {
    console.log('new argument submission!', newArgument);
    const premiseIds = [];
    _.forEach(newArgument.premises, (premise) => {
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

            <SearchInput
              submissionHandler={this.searchClaims}
              placeholder="Search Claims"
              label="Search"
              inputValue={this.state.searchTerm}
              id="graph-scene-search-input"
            />

          </div>
        </div>
        <div className="page__body no-padding">
          <div className="sidebar-layout">

            <div className="sidebar-layout__side padding">
              <GraphSearchResults
                results={this.state.searchResults}
                resultClickHandler={this.resultClickHandler}
              />
              {/* <ArgumentBuilder submissionHandler={this.newArgumentSubmissionHandler} /> */}
            </div>

            <div className="sidebar-layout__main no-padding">
              <GraphSvg>
                {/* <GraphArg x={30} y={30} claimSize={`${this.state.claimSize}`} claimText="nope" /> */}

                {/* later on, there will be a button click to expand argumetn groups but for now we load as soon as graph claim true */}

                {(this.state.graphClaim &&
                  <GraphClaim x={0} y={-250} claim={this.state.graphClaim}/>
                )}

                {/* {(this.state.arguments &&
                  <GraphArg firstArgumentGroup={this.state.graphClaim.arguments[0]} />
                )} */}

              </GraphSvg>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

GraphScene.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};
