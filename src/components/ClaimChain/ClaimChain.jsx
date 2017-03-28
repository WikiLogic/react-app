import React from 'react';
import api from '../../API/api.js';
import ChainLink from './ChainLink.jsx';

/* A chain going down from the claim of interest
 * Only one line for this version
 */

export default class ClaimChain extends React.Component {

	constructor (props) {
		super(props);
        this.chainLinkClickHandler = this.chainLinkClickHandler.bind(this);
        this.focusPremisClickHandler = this.focusPremisClickHandler.bind(this);
        this.state = {
            focus_highlight_premis_id: "",
            chain: []
        }
        //Each object in the chain is a claim that's highlighted from within an argument group of the previous level
        //so each object in the chain is actually that claim's array of arguments. But we could just hold the claim to keep things simpler
        //chain: [ claim{ id:1, arguments: [ { premises: [ {...} ] } ] } ]
	}

    //the focus premises get their own click handler as the logic is a bit different
    focusPremisClickHandler(premis){
        //as it's a focus premis, we're starting the chain from scratch
        let newChain = [];

        api.getClaimDetailById(premis.id)
        .then((data) => {

            newChain.push({
                claim: data.claim,
                highlighted_premis_id: ""
            });

            this.setState({
                chain: newChain,
                focus_highlight_premis_id: premis.id
            });
            
        }).catch((err) => {
            console.error("Error in claim detail api from a premis click", err);
        });
    }

    chainLinkClickHandler(premis, chainLink, index){
        //When a chain link premis is clicked, we need to:
        let newChain = this.state.chain;
        
        //clear out any lower level rows. 
        newChain = newChain.slice(0, index + 1);
        
        //highlight the premis that was clicked
        newChain[newChain.length - 1].highlighted_premis_id = premis.id;
        
        //load in the arguments of that premis into the next level
        api.getClaimDetailById(premis.id)
        .then((data) => {

            newChain.push({
                claim: data.claim,
                highlighted_premis_id: ""
            });

            this.setState({
                chain: newChain
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
                return <ChainLink claim={chainLink.claim} key={index} highlightedPremisId={chainLink.highlighted_premis_id} premisClickHandler={(premis) => {
                    this.chainLinkClickHandler(premis, this.state.focused_claim, index);
                }}/>
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
                <ChainLink claim={this.props.focused_claim} highlightedPremisId={this.state.focus_highlight_premis_id} premisClickHandler={(premis) => {
                    this.focusPremisClickHandler(premis);
                }}/>

                {/* The rest of the links - all the claims below */}
                {theChain}

			</div>
		);
	}
}