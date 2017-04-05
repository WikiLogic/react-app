import React from 'react';
import Argument from '../Argument/Argument.jsx';
import API from '../../API/api.js';
import SearchInput from '../SearchInput/SearchInput.jsx';
import Claim from '../Claim/Claim.jsx';

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
            },
            premis_search_results: []
        }
        this.handleTypeToggle = this.handleTypeToggle.bind(this);
        this.handlePremisSearch = this.handlePremisSearch.bind(this);
        this.handlePremisResultClick = this.handlePremisResultClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleTypeToggle(type){
        let newArgument = this.state.argument;
        newArgument.type = type;
        this.setState({ argument: newArgument });
    }

    handlePremisSearch(term){
        console.log('premis search term');
        if (isNaN(term)) {
			API.searchClaimsByTerm(term)
			.then((data) => {
				this.setState({ premis_search_results: data.claims });
			}).catch((err) => {
				console.error('search term api call error', err);
			});
		} else {
			API.getClaimDetailById(term)
			.then((data) => {
				console.log("got claim by ID", data);
                this.setState({ premis_search_results: [data.claim] });
			}).catch((err) => {
				console.error('search claim api call error', err);
			});
		}
    }

    handlePremisResultClick(){
        console.log("premis serach result clicked!");
    }

    handleSubmit(event){
        event.preventDefault();
        
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

        let premisSearchResults = null;
        if (this.state.premis_search_results.length > 0){
            premisSearchResults =this.state.premis_search_results.map(function(premis, index){
                return <Claim claim={premis} key={index} handleClick={this.handlePremisResultClick} isSelected={false}/>;
            }.bind(this));
        }

		return (
			<div className="add-argument-form">
                <h4 className="add-argument-form__parent-claim">
                    {this.props.parentClaim.text}
                </h4>

                <div className="add-argument-form__type-toggle">
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
                </div>

                <div className="add-argument-form__premis-finder">
                    <div className="premis-finder">
                        <SearchInput submissionHandler={this.handlePremisSearch} placeholder="Search Premises"/>
                    
                        <div className="premis-finder__results">
                            {premisSearchResults}
                        </div>
                    </div>
                </div>

                <div className="add-argument-form__argument-simulator">
                    <Argument argumentObject={this.state.argument}/>
                </div>

                <div className="add-argument-form__submit">
                    <button onClick={this.handleSubmit}>Publish</button>
                </div>
			</div>
		);
	}
}