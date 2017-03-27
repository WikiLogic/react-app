import React from 'react';
import eventManager from '../../eventManager/eventManager.js';
import actions from '../../eventManager/actions.js';

import Argument from './Argument.jsx';

/* A chain going down from the claim of interest
 * Only one line for this version
 */

export default class ClaimChain extends React.Component {

	constructor (props) {
		super(props)
	}

	render() {
        if (typeof this.props.focused_claim.body == 'undefined') { return null; }

        let focusArguments = null;
        if (typeof this.props.focused_claim.arguments != 'undefined') {
            focusArguments = this.props.focused_claim.arguments.map(function(argumentObject, index){
                return <Argument argumentObject={argumentObject} key={index} />
            });
        }

		return (
			<div className="claim-chain">
                <div className="claim-chain__row">
                    <div className="claim-chain__top-claim">
                        {this.props.focused_claim.body}
                    </div>   
                </div>
                <div className="claim-chain__row">
                    {/* loop through the focus claims's arguments */}
                    {focusArguments}
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