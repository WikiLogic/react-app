//React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

//JS
import eventManager from './eventManager/eventManager.js';
import actions from './eventManager/actions.js';
import API from './API/api.js';

//React components
import SearchInput from './components/SearchInput/SearchInput.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import ClaimChain from './components/ClaimChain/ClaimChain.jsx';
import ClaimDetail from './components/ClaimDetail/ClaimDetail.jsx';
import AddClaimForm from './components/AddClaimForm/AddClaimForm.jsx';
import EditClaimForm from './components/EditClaimForm/EditClaimForm.jsx';
import Circle from './components/Circle/Circle.jsx';

class Wikilogic extends React.Component {

	constructor (props) {
		super(props)
		
		this.state = {
			search_results: [],
			focused_claim: {}
		};

		this.searchClaims = this.searchClaims.bind(this);
		this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
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

	setNewClaimFocus(claim){
		API.getClaimDetailById(claim.id)
		.then((data) => {
			this.setState({ focused_claim: data.claim });
		}).catch((err) => {
			console.error('claim focus api call error', err);
		});
	}

	render() {
		return (
			<Router history={history}>
				<div className="main-layout">
					<div className="main-layout__header">

						<header className="header">

							<Link to="/" className="header__title">Wikilogic</Link>

							<div className="header__links">
								<Link to="/">Search</Link>
								<Link to="/new-claim">New claim</Link>
							</div>

						</header>

					</div>
					
					<main className="main main-layout__body">

						{/* the home page: search & results */}
						<Route path="/" exact render={() => (
							<div className="search-layout">
								<div className="search-layout__header">
									<div className="max-width-wrap">

										<SearchInput submissionHandler={this.searchClaims} placeholder="Search Claims"/>

									</div>
								</div>
								<div className="search-layout__results">
									<div className="max-width-wrap">

										<SearchResults search_results={this.state.search_results} resultClickHandler={this.setNewClaimFocus}/>

									</div>
								</div>
							</div>
							
						)}/>

						<Route path="/claim/:claimId" exact render={(routeData) => (
							<div className="claim-detail-layout">
								<div className="claim-detail-layout__header">
									<div className="max-width-wrap">

										<ClaimChain topClaimId={routeData.match.params.claimId}/>

									</div>
								</div>
								<div className="claim-detail-layout__body">
									<div className="max-width-wrap">

									</div>
								</div>
							</div>
						)}/>

									{/*<div className="sidebar-layout">
										<div className="sidebar-layout__main">
											
											<ClaimChain top_claim={this.state.focused_claim}/>

										</div>
										<div className="sidebar-layout__side">

											<SearchResults search_results={this.state.search_results} resultClickHandler={this.setNewClaimFocus}/>

										</div>	
									</div> */}

						<Route path="/new-claim" exact render={() => (
							<div className="new-claim-layout">
								<div className="new-claim-layout__header">
									<div className="max-width-wrap">

									<AddClaimForm /> 

									</div>
								</div>
								<div className="new-claim-layout__results">
									<div className="max-width-wrap">

									</div>
								</div>	
							</div>
						)}/>

						<Route path="/edit-claim" exact render={() => (
							<div className="sidebar-layout">
								<div className="sidebar-layout__main">

									<EditClaimForm /> 

								</div>
								<div className="sidebar-layout__side">

									<SearchResults search_results={this.state.search_results} resultClickHandler={this.setNewClaimFocus}/>

								</div>	
							</div>
						)}/>

					</main>

					<div className="main-layout__footer">
						<footer className="footer max-width-wrap">

							<div className="footer__col">
								Wikilogic is maintainted by the <a href="www.wikilogicfoundation.org" target="_blank">Wikilogic Foundation</a>, a non-profit organisation...
							</div>
							<div className="footer__col">
								Privacy policy
							</div>
							<div className="footer__col">
								Terms of use
							</div>

						</footer>	
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(
	<Wikilogic />, 
	document.getElementById('root')
);