import React from 'react';

/* A chain going down from the claim of interest
 * Only one line for this version
 */

export default class ClaimChain extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		/* Change handler is required otherwise the state wouldn't update and nothing will show up in the input when typing
		 * https://facebook.github.io/react/docs/forms.html
		 */
		//this.setState({value: event.target.value});
	}


	render() {

        let premises = this.props.argumentObject.premises.map(function(premis, index){
            return <div className="claim-chain-argument__premis" key={index}>
                {premis.body}
            </div>;
        });

		return (
			<div className="claim-chain-argument">
                {premises}
			</div>
		);
	}

}