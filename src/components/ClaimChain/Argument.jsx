import React from 'react';

/* A chain going down from the claim of interest
 * Only one line for this version
 */

export default class ClaimChain extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
        };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(premis) {
		this.props.premisClickHandler(premis);
	}

	render() {

        let premises = this.props.argumentObject.premises.map(function(premis, index){
			let className = "claim-chain-argument__premis";
			if (premis.id == this.props.highlightedPremisId) {
				className += " claim-chain-argument__premis--highlighted";
			}
            return <div className={className} key={index} onClick={() => { this.handleClick(premis); }}>
                {premis.body}
            </div>;
        }.bind(this));

		return (
			<div className="claim-chain-argument">
                {premises}
			</div>
		);
	}

}