import React from 'react';
import StatusBar from '../StatusBar/StatusBar.jsx';

/* Each Claim in the list of search results
 */

export default class Claim extends React.Component {

	constructor (props) {
		super(props)
	}

	render() {
		let cssClass = "claim";
		if (this.props.isSelected) { cssClass += " claim--selected"; }
		
		if (this.props.claim.labels.includes('Axiom')) { 
			cssClass += " claim--axiom"; 
		}

		return (
			<div className={cssClass} onClick={() => this.props.handleClick(this.props.claim)}>
				<div className="claim__body">
                    {this.props.claim.text}
                </div>
                <StatusBar state={this.props.claim.state}/>
			</div>
		);
	}
}