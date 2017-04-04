import React from 'react';
import Argument from '../Argument/Argument.jsx';

/* Search & select claims to add as premises to an argument
 */

export default class AddArgumentForm extends React.Component {

	constructor (props) {
		super(props);
        this.state = {
            argument: {
                type: 'OPPOSES',
                premises: []
            }
        }
	}

	render() {

		return (
			<form className="form">
                <h4 className="form__title">
                    Create a new argument
                </h4>

                <div>Note of which claim this argument will be going to - and possibly the impact it'll have?</div>

                <label className="form__label">
                    <div className="form__label-text">Type toggle: opposes / supports</div>
                </label>

                <div>some kind of claim selector</div>

                <Argument argumentObject={this.state.argument}/>
                
                <div className="form__submit">
                    <input className="form__submit-button" type="submit" value="publish"/>
                </div>
			</form>
		);
	}
}