import React from 'react';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* The Search Results
 * Takes an array of claims in a prop called searchResults and spits them out in a list
 */
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('this.props.searchResults', this.props.searchResults);
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
          <Claim claim={this.props.searchResults[r]} isSelected={false}>
            <p>Child!</p>
          </Claim>
        </div>
      );
    }

    return (
      <div className="search-results">
        {searchResultMarkup}
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
