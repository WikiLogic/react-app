import React from 'react';
import SearchResult from './SearchResult.jsx';

/* The Search Results
 * This is the parent component for the search results list
 */

export default class SearchResults extends React.Component {

	constructor (props) {
		super(props)
	}

	render() {

        let searchResults = this.props.search_results.map(function(search_result, index){
            return <SearchResult search_result={search_result} key={index}/>;
        });

		return (
			<div className="search-results">
                {searchResults}
            </div>
		);
	}
}