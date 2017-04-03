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
                <div className="form__header">
                    Add a new claim
                </div>
                <div className="form__body">
                    <label className="form__row">
                        <textarea className="form__input">
                            text area
                        </textarea>
                    </label>
                    <label className="form__row">
                        <span className="form__label">Claim: </span>
                        <input type="text" name="text" className="form__input"/>
                    </label>
                    <div className="form__row">
                        <input type="submit" value="submit"/>
                    </div>
                </div>
			</form>
		);
	}
}