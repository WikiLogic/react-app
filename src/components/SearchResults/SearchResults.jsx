import React from 'react';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* The Search Results
 * This is the parent component for the search results list
 */

export default function SearchResults(props) {
  if (typeof props.searchResults === 'undefined') {
    return null;
  }

  const searchResults = props.searchResults.map(searchResult => (
    <div key={searchResult.id} className="search-results__result">
      <Claim claim={searchResult} isSelected={false} />
    </div>
  ));

  return (
    <div className="search-results">
      {searchResults}
    </div>
  );
}

SearchResults.propTypes = {
  searchResults: React.PropTypes.arrayOf(React.PropTypes.object),
};

SearchResults.defaultProps = {
  searchResults: [],
};
