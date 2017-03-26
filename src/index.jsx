import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom'; //BrowserRouter as 
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

import App from './components/App.jsx';

class Wikilogic extends React.Component {

	constructor (props) {
		super(props)
		//this is pretty much the same as the location data object that comes from the location API
		this.state = {
            
		};
	}

	componentWillMount(){
        
	}

	componentWillUnmount(){
        
	}


	render() {
		return (
			<Router history={history}>
				<div>
				<header className="header">
					<div className="header__col">
						<a href="/" className="site-flag">
							<div href="/" className="site-flag__title">Wikilogic</div>
							<div className="site-flag__tagline">tagline</div>
						</a>
					</div>
					<div className="header__col">
						<a href="/alchemy">Alchemy</a>
						<a href="/d3">D3</a>
						<a href="/d3v4">D3v4</a>
					</div>
					<div className="header__col header__col--search">
						<div className="search">
							<input type="text" className="search__input js-search-input" placeholder="Search claims"/>
						</div>
					</div>
					<div className="header__col">
						<div className="language-selector">
							<a href="/lang" className="language-selector__current">En</a>

							<div className="language-selector__dropdown">
								<div className="language-selector__dropdown-option">Spanish</div>
								<div className="language-selector__dropdown-option">French</div>
								<div className="language-selector__dropdown-option">German</div>
							</div>
							
						</div>
					</div>
                </header>
				<main className="main">
					<section className="section sidebar-layout">
						<div className="sidebar-layout__main">
							chart in here!
						</div>
						<div className="sidebar-layout__side">
							<div className="search-results">
								<div className="search-results__title"></div>
								<div className="search-results__list">
									<div className="js-search-results-list">search results here!</div>
								</div>
							</div>
						</div>
					</section>
				</main>
				<footer className="footer">
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