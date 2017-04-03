import React from 'react';

/* Each Claim in the list of search results
 */

export default class AddClaimForm extends React.Component {

	constructor (props) {
		super(props)
	}

	render() {

		return (
			<form className="form">
                <h4 className="form__title">
                    Create a new claim
                </h4>

                <label className="form__label">
                    <div className="form__label-text">Claim text</div>
                    <textarea className="form__input">
                        text area
                    </textarea>
                </label>
                
                <div className="form__submit">
                    <input className="form__submit-button" type="submit" value="submit"/>
                </div>
			</form>
		);
	}
}