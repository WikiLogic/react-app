import React from 'react';
import eventManager from '../../eventManager/eventManager.js';
import actions from '../../eventManager/actions.js';

/* A chain going down from the claim of interest
 * Only one line for this version
 */

export default class ClaimChain extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
            apiReturnedClaimDetailSubscription: {}
        };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		/* Change handler is required otherwise the state wouldn't update and nothing will show up in the input when typing
		 * https://facebook.github.io/react/docs/forms.html
		 */
		this.setState({value: event.target.value});
	}

    componentWillMount(){
        let apiReturnedClaimDetailSubscription = eventManager.subscribe(actions.API_RETURNED_CLAIM_DETAIL, function(data){
            console.log('CLAIM DEEEEETAIL!', data);
        });
    }

    componentWillUnmount(){
        eventManager.unsubscribe(apiReturnedClaimDetailSubscription);
    }

	render() {
		return (
			<div className="claim-chain">
                <div className="claim-chain__row">
                    <div className="claim-chain__top-claim">
                        {this.props.focused_claim.body}
                    </div>   
                </div>
                <div className="claim-chain__row">
                    row
                </div>
                <div className="claim-chain__row">
                    row
                </div>
                <div className="claim-chain__row">
                    row
                </div>
			</div>
		);
	}

}