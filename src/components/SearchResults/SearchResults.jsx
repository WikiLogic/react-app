import React from 'react';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* The Search Results
 * This is the parent component for the search results list
 */
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.renderSearchResults = this.renderSearchResults.bind(this);
  }

  renderSearchResults() {
    if (!this.props.searchResults) {
      return <p>No results</p>;
    }

    if (this.props.searchResults.length === 0) {
      return <p>No results</p>;
    }

    const searchResultMarkup = [];
    for (let r = 0; r < this.props.searchResults.length; r++) {
      searchResultMarkup.push(
        <div key={this.props.searchResults[r]._id} className="search-results__result">
          <Claim claim={this.props.searchResults[r]} isSelected={false} />
        </div>
      );
    }
    return searchResultMarkup;
  }

  render() {

    return (
      <div className="search-results">
        {this.renderSearchResults()}
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: React.PropTypes.arrayOf(React.PropTypes.object),
};

SearchResults.defaultProps = {
  searchResults: null,
};
