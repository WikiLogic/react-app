import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom'; //BrowserRouter as 
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

import eventManager from './eventManager/eventManager.js';
import actions from './eventManager/actions.js';

import api from './API/api.js';

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
		this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
	}

	componentWillMount(){
        eventManager.subscribe(actions.API_RETURNED_CLAIMS, (data) => {
			console.log('API returned alcims!', data);
			this.setState({ search_results: data.claims });
		});
	}

	setNewClaimFocus(claim){
		api.getClaimDetailById(claim.id);

		this.setState({
			focused_claim: claim
		})
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
								<SearchInput submissionHandler={(term) => {
									if (isNaN(this.state.value)) {
										eventManager.fire(actions.SEARCH_TERM_SUBMITTED, term);
									} else {
										eventManager.fire(actions.SEARCH_NUMBER_SUBMITTED, term);
									}
								}}/>
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

									<SearchResults search_results={this.state.search_results} resultClick={(resultClicked) => {
										
										this.setNewClaimFocus(resultClicked);
									}}/>

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