import React from 'react';
import SearchInput from '../../components/SearchInput/SearchInput.jsx';
import SearchResults from '../../components/SearchResults/SearchResults.jsx';
import API from '../../services/api.js';

/**
 * The Search Results page
 * @prop {*} name 
 */
export default class SearchScene extends React.Component {
	
	constructor (props) {
		super(props);

		this.state = {
			search_results: []
		};

		this.searchClaims = this.searchClaims.bind(this);
	}

	searchClaims(search){
		if (isNaN(search)) {
			console.log("searching by term", search);
			API.searchClaimsByTerm(search)
			.then((data) => {
				this.setState({ search_results: data.claims });
			}).catch((err) => {
				console.error('search term api call error', err);
			});
		} else {
			console.log("searching by id", search);
			API.getClaimDetailById(search)
			.then((data) => {
				this.setState({ focused_claim: data.claim });
			}).catch((err) => {
				console.error('search claim api call error', err);
			});
		}
	}

	render() {
		
		return (
			<div className="search-layout">
				<div className="search-layout__header">
					<div className="max-width-wrap">

						<SearchInput submissionHandler={this.searchClaims} placeholder="Search Claims"/>

					</div>
				</div>
				<div className="search-layout__results">
					<div className="max-width-wrap">

						<SearchResults search_results={this.state.search_results}/>

					</div>
				</div>
			</div>
		);
	}
}