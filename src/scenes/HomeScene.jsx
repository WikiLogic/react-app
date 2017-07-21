import React from 'react';
import SearchInput from 'Components/SearchInput/SearchInput.jsx';

/**
 * The Home page
 * @prop {*} name 
 */
export default class SearchScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_results: [],
    };

    this.searchClaims = this.searchClaims.bind(this);
  }

  searchClaims(search) {
    // go to /search?s=term
    this.props.history.push(`/search?s=${search}`);
  }

  render() {
    return (
      <div className="search-layout">
        <div className="search-layout__header">
          <div className="max-width-wrap">
            You&#39;ve come home

            <SearchInput submissionHandler={this.searchClaims} placeholder="Search Claims" />

          </div>
        </div>
      </div>
    );
  }
}

SearchScene.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};
