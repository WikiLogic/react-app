import React from 'react';
import Argument from '../Argument/Argument.jsx';

/* A chain going down from the claim of interest
 * Only one line for this version
 */

export default class ChainLink extends React.Component {

	constructor (props) {
		super(props)
		this.premisClickHandler = this.premisClickHandler.bind(this);
	}

	premisClickHandler(premis) {
		this.props.premisClickHandler(premis);
	}

	render() {

        let linkArguments = null;
		
        if (this.props.claim.arguments.length > 0) {
            linkArguments = this.props.claim.arguments.map(function(argumentObject, index){
                return <Argument argumentObject={argumentObject} key={index} highlightedPremisId={this.props.highlightedPremisId} premisClickHandler={this.premisClickHandler} />
            }.bind(this));
        } else {
			linkArguments = <div>No more arguments - <a href="http://www.wikilogicfoundation.org/get-involved/" target="_blank">sign up</a> to add your own!</div>;
		}

		return (
			<div className="claim-chain__row">
                {linkArguments}
			</div>
		);
	}

}