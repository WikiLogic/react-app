import React from 'react';
import StatusBar from '../StatusBar/StatusBar.jsx';
import Claim from '../Claim/Claim.jsx';

/* An argument group
 */

export default class Argument extends React.Component {

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
		
		//loop through the premises in this argument
        let premises = this.props.argumentObject.premises.map(function(premis, index){
			
			let isSelected = (premis.id == this.props.highlightedPremisId);
            
			return (
				<div className="argument__premis" key={index}>
					<Claim claim={premis} isSelected={isSelected} handleClick={() => { this.handleClick(premis); }}/>
				</div>
			);
        }.bind(this));

		return (
			<div className={`argument argument--${this.props.argumentObject.type}`}>
				<div className="argument__header">
					{this.props.argumentObject.type}
				</div>
				<div className="argument__body">
                	{premises}
				</div>
			</div>
		);
	}
}