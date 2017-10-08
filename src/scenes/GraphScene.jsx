import React from 'react';
import SearchInput from 'WlComponents/SearchInput/SearchInput.jsx';
import GraphSvg from 'WlComponents/GraphSvg/GraphSvg.jsx';
import DougArg from 'WlComponents/DougArg/DougArg.jsx';
import DougClaim from 'WlComponents/DougClaim/DougClaim.jsx';

/**
 * The Home page
 * @prop {*} name 
 */
export default class GraphScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_results: [],
      numberOfArgsInGroup: 2,
      claimSize: 20,
      claimText: 'change'
    };

  }

  searchClaims(term) {
    console.log('search', term);
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <SearchInput
              id="home-scene-search-input"
              label="Search"
              submissionHandler={this.searchClaims}
              placeholder="Search Claims"
            />

          </div>
        </div>
        <div className="page__body page__body--graph">

          <GraphSvg>

            <DougClaim x={-40} y={-50} claimSize={`${this.state.claimSize}`} claimText="OriginalClaim" />

            <DougArg x={30} y={30} claimSize={`${this.state.claimSize}`} claimText="nope" />

          </GraphSvg>
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
