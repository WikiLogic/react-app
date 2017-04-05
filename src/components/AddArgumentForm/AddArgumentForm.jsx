import React from 'react';
import Argument from '../Argument/Argument.jsx';
import API from '../../API/api.js';

/* Search & select claims to add as premises to an argument
 */

export default class AddArgumentForm extends React.Component {

	constructor (props) {
		super(props);
        //state is bundled inside an argument for ease in passing to the argument element
        this.state = {
            argument: {
                type: 'SUPPORTS',
                premises: []
            }
        }
        this.handleTypeToggle = this.handleTypeToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleTypeToggle(type){
        let newArgument = this.state.argument;
        newArgument.type = type;
        this.setState({ argument: newArgument });
    }

    handleSubmit(){
        API.postNewArgument({
            parent_claim: this.props.parentClaim.id,
            type: 'OPPOSES',
            premises: ['1','2','3']
        }).then((data) => {  
            console.log("api returned new claim!", data);
        }).catch((err) => {
            console.log('API returned a fail', err);
        });
    }

	render() {

		return (
			<form className="form" onSubmit={this.handleSubmit}>
                <h4 className="form__title">
                    {this.props.parentClaim.text}
                </h4>

                <div className="type-toggle">
                    <label className="type-toggle__label">
                        <input className="type-toggle__input" type="radio" value="SUPPORTS" checked={this.state.argument.type == 'SUPPORTS'} onChange={() => this.handleTypeToggle('SUPPORTS')} />
                        <div className="type-toggle__text">SUPPORTS</div>
                    </label>

                    <label className="type-toggle__label">
                        <input className="type-toggle__input" type="radio" value="OPPOSES" checked={this.state.argument.type == 'OPPOSES'} onChange={() => this.handleTypeToggle('OPPOSES')} />
                        <div className="type-toggle__text">OPPOSES</div>
                    </label>
                </div>

                <div>some kind of claim selector</div>

                <Argument argumentObject={this.state.argument}/>
                
                <div className="form__submit">
                    <input className="form__submit-button" type="submit" value="publish"/>
                </div>
			</form>
		);
	}
}