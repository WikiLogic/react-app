import React from 'react';
import { Link } from 'react-router-dom';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* The Search Results
 * This is the parent component for the search results list
 */

export default function SearchResults(props) {
  if (typeof props.searchResults === 'undefined') {
    return null;
  }

  const searchResults = props.searchResults.map(searchResult => (
    <Link to={`/claim/${searchResult.id}`} key={searchResult.id} className="search-results__result">
      <Claim claim={searchResult} isSelected={false} />
    </Link>
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
