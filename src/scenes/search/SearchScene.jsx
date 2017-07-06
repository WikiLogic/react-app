import React from 'react';
import SearchInput from '../../components/SearchInput/SearchInput.jsx';
import SearchResults from '../../components/SearchResults/SearchResults.jsx';
import API from '../../services/api.js';
import urlParameter from '../../services/urlParameter.js';

/**
 * The Search Results page
 */
export default class SearchScene extends React.Component {
	
	constructor (props) {
		super(props);

		this.state = {
			search_term: '',
			search_results: []
		};

		this.searchClaims = this.searchClaims.bind(this);
	}

	componentDidMount(){
		//get the search param to see if there is anything there
		var URLsearchTerm = urlParameter.get('s', this.props.location.search);

		//if there is
		if (URLsearchTerm != '') {
			//set the state so it renders
			this.setState({
				search_term: URLsearchTerm
			});
			
			//and run the search
			this.searchClaims(URLsearchTerm);
		}
	}

	searchClaims(search){
		//run the search
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

		//add it to the url
		this.props.history.push('/search?s=' + search);

		//set the state
		this.setState({
			search_term: search
		});
	}


	render() {
		return (
			<div className="search-layout">
				<div className="search-layout__header">
					<div className="max-width-wrap">

						<SearchInput submissionHandler={this.searchClaims} placeholder="Search Claims" inputValue={this.state.search_term}/>

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