import React from 'react';
import StatusBar from '../StatusBar/StatusBar.jsx';

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
        console.log("this.props.highlightedPremisId", this.props.highlightedPremisId);
        let premises = this.props.argumentObject.premises.map(function(premis, index){
			let className = "argument__premis";
			
			if (premis.id == this.props.highlightedPremisId) {
				className += " argument__premis--highlighted";
			}
            
			return (
				<div className={className} key={index} onClick={() => { this.handleClick(premis); }}>
					{premis.body}
					<StatusBar state={premis.state}/>
				</div>
			);
        }.bind(this));

		return (
			<div className={`argument argument--${this.props.argumentObject.type}`}>
                {premises}
			</div>
		);
	}
}