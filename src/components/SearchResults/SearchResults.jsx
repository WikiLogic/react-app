import React from 'react';
import Claim from 'Components/Claim/Claim';
import { Link } from 'react-router-dom';

/* The Search Results
 * This is the parent component for the search results list
 */

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    if (typeof this.props.searchResults === 'undefined') {
      return null;
    }

    const searchResults = this.props.searchResults.map(searchResult => (
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
}

SearchResults.propTypes = {
  searchResults: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
