import React from 'react';
import StatusIndicator from '../StatusIndicator/StatusIndicator.jsx';

/* Each Claim in the list of search results
 */

export default class Claim extends React.Component {

	constructor (props) {
		super(props)
	}

	render() {
		let cssClass = "claim";
		if (this.props.isSelected) { cssClass += " claim--selected"; }
		
		if (typeof this.props.claim.labels !== "undefined" && this.props.claim.labels.includes('Axiom')) { 
			cssClass += " claim--axiom"; 
		}

		return (
			<div className={cssClass} onClick={() => this.props.handleClick(this.props.claim)}>
				<div className="claim__body">
                	<div className="claim__status-circle">
						<StatusIndicator state={this.props.claim.state} type="circle"/>
					</div>
					<div className="claim__text">
                    	{this.props.claim.text}
					</div>
                </div>
			</div>
		);
	}
}