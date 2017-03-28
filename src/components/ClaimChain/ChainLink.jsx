import React from 'react';
import Argument from './Argument.jsx';

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
        if (typeof this.props.claim.arguments != 'undefined') {
            linkArguments = this.props.claim.arguments.map(function(argumentObject, index){
                return <Argument argumentObject={argumentObject} key={index} highlightedPremisId={this.props.highlightedPremisId} premisClickHandler={this.premisClickHandler} />
            }.bind(this));
        }

		return (
			<div className="claim-chain__row">
                {linkArguments}
			</div>
		);
	}

}