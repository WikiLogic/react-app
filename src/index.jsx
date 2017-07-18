//React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

//JS
import API from 'API/api';

//React components
import SearchResults from './components/SearchResults/SearchResults.jsx';
import EditClaimForm from './components/EditClaimForm/EditClaimForm.jsx';
import Circle from './components/Circle/Circle.jsx';

import Notifyer from 'Notifyer/Notifyer';
import Notify from 'Services/notify';

//Scenes
import HomeScene from 'Scenes/HomeScene';
import SearchScene from 'Scenes/SearchScene';
import ClaimDetailScene from 'Scenes/ClaimDetailScene';
import ClaimCreateScene from 'Scenes/ClaimCreateScene';
import StyleguideScene from 'Scenes/StyleguideScene';

class Wikilogic extends React.Component {

	constructor (props) {
		super(props)
		
		this.state = {
			search_results: [],
			focused_claim: {}
		};

		this.setNewClaimFocus = this.setNewClaimFocus.bind(this);
	}

	setNewClaimFocus(claim){
		API.getClaimDetailById(claim.id)
		.then((data) => {
			this.setState({ focused_claim: data.claim });
		}).catch((err) => {
			Notify.post(err);
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

					<Route path="/" exact component={HomeScene}> 
					</Route>

					<Route path="/search" exact component={SearchScene}> 
					</Route>

					<Route path="/claim/:claimId" exact component={ClaimDetailScene}>
					</Route>

					<Route path="/new-claim" exact component={ClaimCreateScene}>
					</Route>

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

					<Route path="/styleguide" exact component={StyleguideScene}>
					</Route>

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