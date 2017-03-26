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
				<div className="jobs-app">
					hello
                </div>
			</Router>
		);
	}
}

ReactDOM.render(
	<Wikilogic />, 
	document.getElementById('root')
);