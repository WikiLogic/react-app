import React from 'react';
import api from '../../API/api.js';
import ChainLink from './ChainLink.jsx';

/* A chain going down from the claim of interest
 * Only one line for this version
 */

export default class ClaimChain extends React.Component {

	constructor (props) {
		super(props);
        this.premisClickHandler = this.premisClickHandler.bind(this);
        this.state = {
            chain: [

            ]
        }
        //Each object in the chain is a claim that's highlighted from within an argument group of the previous level
        //so each object in the chain is actually that claim's array of arguments. But we could just hold the claim to keep things simpler
        //chain: [ claim{ id:1, arguments: [ { premises: [ {...} ] } ] } ]
	}

    premisClickHandler(premis){
        console.log("premis click handler!");
        //When a premis is clicked, we need to:
        //clear out any lower level rows. 
        //highlight the premis that was clicked, and 
        //load in the arguments of that premis into the next level
        api.getClaimDetailById(premis.id)
        .then((data) => {

            let currentChain = this.state.chain;
            currentChain.push(data.claim);

            this.setState({
                chain: currentChain
            });
            
        }).catch((err) => {
            console.error("Error in claim detail api from a premis click", err);
        });
    }

	render() {
        if (typeof this.props.focused_claim.body == 'undefined') { return null; }

        let theChain = null;
        if (this.state.chain.length > 0){
            theChain = this.state.chain.map((chainLink, index) => {
                return <ChainLink claim={chainLink} key={index} premisClickHandler={this.premisClickHandler}/>
            });
        }

		return (
			<div className="claim-chain">
                <div className="claim-chain__row">
                    <div className="claim-chain__top-claim">
                        {this.props.focused_claim.body}
                    </div>   
                </div>

                {/* The first link - arguments of the focus claim */}
                <ChainLink claim={this.props.focused_claim} premisClickHandler={this.premisClickHandler}/>

                {/* The rest of the links - all the claims below */}
                {theChain}

			</div>
		);
	}
}