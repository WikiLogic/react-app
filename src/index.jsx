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
import Claim from './components/Claim/Claim.jsx';
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
			<div className="main-layout">
				<div className="main-layout__header">

					<header className="header">

						<Link to="/" className="header__title">Wikilogic</Link>

						<div className="header__links">
							<Link to="/">Search</Link>
							<Link to="/new-claim">New claim</Link>
							<Link to="/styleguide">Styleguide</Link>
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

					{/* Calim detail page */}
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

					{/* New claim page */}
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

					{/* Edit claim page ... not sure if this should really be a thing */}
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

					<Route path="/styleguide" exact render={() => (
						<div>
							<h1>Heading 1</h1>
							<h2>Heading 2</h2>
							<h3>Heading 3</h3>
							<h4>Heading 4</h4>
							<h5>Heading 5</h5>
							<h6>Heading 6</h6>
							<p>123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, repellat, ad. Autem reiciendis nobis, aspernatur, quo delectus modi quae vel assumenda aliquam inventore recusandae iure rerum odio veniam, consectetur non.</p>

							<Claim
								claim={{
									text: "claim text",
									probability: 0.75
								}} 
							/>
							<Claim
								claim={{
									text: "claim text",
									probability: 0.5
								}} 
							/>
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
		);
	}
}

ReactDOM.render(
	<Router history={history}>
		<Wikilogic />
	</Router>, 
	document.getElementById('root')
);