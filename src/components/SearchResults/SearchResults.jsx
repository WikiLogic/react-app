import React from 'react';
import SearchResult from './SearchResult.jsx';

/* The Search Results
 * This is the parent component for the search results list
 */

export default class SearchResults extends React.Component {

	constructor (props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(resultObject){
		//TODO: highlight the clicked result, clear out any other highlights

		this.props.resultClick(resultObject);
	}

	render() {
		if (typeof this.props.search_results == 'undefined') { 
			console.warn('Search result props undefined :(');
			return null; 
		}
		
        let searchResults = this.props.search_results.map(function(search_result, index){
            return <SearchResult search_result={search_result} key={index} handleClick={this.handleClick}/>;
        }.bind(this));

		return (
			<div className="search-results">
                {searchResults}
            </div>
		);
	}
}