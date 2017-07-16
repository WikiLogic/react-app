import React from 'react';
import API from 'API/api';
import Claim from 'Components/Claim/Claim.jsx';

/**
 * The Search Results page
 * @prop {*} name 
 */
export default class StyleguideScene extends React.Component {
	
	constructor (props) {
		super(props);

		this.state = {
		};

	}


	render() {
		
		return (
			<div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
                <p>123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, repellat, ad. Autem reiciendis nobis, aspernatur, quo delectus modi quae vel assumenda aliquam inventore recusandae iure rerum odio veniam, consectetur non.</p>

                <Claim
                    claim={{
                        text: "claim text",
                        probability: 0.75
                    }} 
                />
                <Claim
                    claim={{
                        text: "claim text",
                        probability: 0.5
                    }} 
                />
            </div>
		);
	}
}