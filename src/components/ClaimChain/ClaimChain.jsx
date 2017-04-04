import React from 'react';
import api from '../../API/api.js';
import ChainLink from './ChainLink.jsx';
import StatusBar from '../StatusBar/StatusBar.jsx';
import ClaimDetail from '../ClaimDetail/ClaimDetail.jsx';

/* A chain of claims so the user can explore a line of argument
 * Click a premis to show it as a ClaimDetail in the following link
 * Links below the claim whos premis was just clicked are cleared out 
 */

export default class ClaimChain extends React.Component {

	constructor (props) {
		super(props);
        this.state = {
            chain: []
        }
        this.premisClickHandler = this.premisClickHandler.bind(this);
	}

    //When this claim chain recieves new props that means there's a new focus claim. So clear out the chain
    componentWillReceiveProps(nextProps){
        this.setState({ 
            chain: [{
                claim: nextProps.top_claim,
                highlighted_premis_id: ""
            }] 
        });
    }


    premisClickHandler(premis, index){
        //When a chain link premis is clicked, we need to:
        let newChain = this.state.chain;
        
        console.log("index", index);
        //clear out any lower level rows. 
        newChain = newChain.slice(0, index + 1);
        
        //highlight the premis that was clicked
        console.log("newChain", newChain);
        newChain[index].highlighted_premis_id = premis.id;
        
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
        let theChain = null;

        if (this.state.chain.length > 0){
            theChain = this.state.chain.map((chainLink, index) => {
                if (chainLink.hasOwnProperty('claim')){
                    return <ClaimDetail claim={chainLink.claim} key={index} highlightedPremisId={chainLink.highlighted_premis_id} premisClickHandler={(premis) => {
                        this.premisClickHandler(premis, index);
                    }}/>
                }
            });
        }

		return (
			<div className="claim-chain">
                {theChain}
			</div>
		);
	}
}