import React from 'react';
import API from '../../API/api.js';

/* Each Claim in the list of search results
 */

export default class AddClaimForm extends React.Component {

	constructor (props) {
		super(props);
        this.state = {
            text:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
	}

    handleChange(event){
        this.setState({
            text:event.target.value
        });
    }

    submitHandler(event){
        event.preventDefault();

        API.postNewClaim({text:this.state.text})
        .then((data) => {  
            console.log("api returned new claim!", data);
        }).catch((err) => {
            console.error('API returned a fail', err);
        });
    }

	render() {

		return (
			<form className="form" onSubmit={this.submitHandler}>
                <h4 className="form__title">
                    Create a new claim
                </h4>

                <label className="form__label">
                    <div className="form__label-text">Claim text</div>
                    <textarea className="form__input"  onChange={this.handleChange} />
                </label>
                
                <div className="form__submit">
                    <input className="form__submit-button" type="submit" value="publish"/>
                </div>
			</form>
		);
	}
}