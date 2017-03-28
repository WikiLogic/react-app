//React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

//JS
import eventManager from './eventManager/eventManager.js';
import actions from './eventManager/actions.js';
import api from './API/api.js';

//React components
import SearchInput from './components/SearchInput/SearchInput.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import ClaimChain from './components/ClaimChain/ClaimChain.jsx';

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
			api.searchClaimsByTerm(search)
			.then((data) => {
				this.setState({ search_results: data.claims });
			}).catch((err) => {
				console.error('search term api call error', err);
			});
		} else {
			api.getClaimDetailById(search)
			.then((data) => {
				console.log("got claim by ID", data);
			}).catch((err) => {
				console.error('search claim api call error', err);
			});
		}
	}

	setNewClaimFocus(claim){
		api.getClaimDetailById(claim.id)
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
					<header className="main-layout__header header">
						<div className="header__col">
							<a href="/" className="site-flag">
								<div href="/" className="site-flag__title">Wikilogic</div>
								{/* <div className="site-flag__tagline">tagline</div> */}
							</a>
						</div>
						<div className="header__col">
							{/*
							<a href="/alchemy">Alchemy</a>
							<a href="/d3">D3</a>
							<a href="/d3v4">D3v4</a>
							*/}
						</div>
						<div className="header__col header__col--search">
							<div className="search">
								<SearchInput submissionHandler={this.searchClaims}/>
							</div>
						</div>
						<div className="header__col">
							{/*
							<div className="language-selector">
								<a href="/lang" className="language-selector__current">En</a>

								<div className="language-selector__dropdown">
									<div className="language-selector__dropdown-option">Spanish</div>
									<div className="language-selector__dropdown-option">French</div>
									<div className="language-selector__dropdown-option">German</div>
								</div>
								
							</div>
							*/}
						</div>
					</header>
					
					<main className="main main-layout__body">
						{/* the home page: search results */}
						<Route path="/" exact render={() => (
							<div className="sidebar-layout">
								<div className="sidebar-layout__main">

									<ClaimChain focused_claim={this.state.focused_claim}/>

								</div>
								<div className="sidebar-layout__side">

									<SearchResults search_results={this.state.search_results} resultClickHandler={this.setNewClaimFocus}/>

								</div>	
							</div>
						)}/>
					</main>

					<footer className="footer main-layout__footer">
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
			</Router>
		);
	}
}

ReactDOM.render(
	<Wikilogic />, 
	document.getElementById('root')
);