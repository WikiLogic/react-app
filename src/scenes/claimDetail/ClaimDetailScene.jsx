import React from 'react';
import API from '../../services/api.js';
import ClaimChain from '../../components/ClaimChain/ClaimChain.jsx';

/**
 * The Search Results page
 * @prop {*} name 
 */
export default class ClaimDetailScene extends React.Component {
	
	constructor (props) {
		super(props);

		this.state = {
		};

	}


	render() {
		
		return (
			<div className="claim-detail-layout">
                <div className="claim-detail-layout__header">
                    <div className="max-width-wrap">

                        <ClaimChain topClaimId={this.props.match.params.claimId}/>

                    </div>
                </div>
                <div className="claim-detail-layout__body">
                    <div className="max-width-wrap">

                    </div>
                </div>
            </div>
		);
	}
}