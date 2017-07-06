import React from 'react';
import SearchInput from '../../components/SearchInput/SearchInput.jsx';
import SearchResults from '../../components/SearchResults/SearchResults.jsx';
import API from '../../services/api.js';
import urlParameter from '../../services/urlParameter.js';

/**
 * The Search Results page
 * @prop {*} name 
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
		var URLsearchTerm = urlParameter.get('s', this.props.location.search);
		console.log("_1", URLsearchTerm);
		this.setState({
			search_term: URLsearchTerm
		});
		console.log("_2", URLsearchTerm);
		if (URLsearchTerm != '') {
			this.searchClaims(URLsearchTerm);
		}
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
		this.props.history.push('/search?s=' + search);
		this.setState({
			search_term: search
		});
	}


	render() {
		console.log("_3", this.state.search_term);

		
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