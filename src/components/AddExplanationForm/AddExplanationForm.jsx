import React from 'react';
import Argument from '../Argument/Argument.jsx';
import API from '../../API/api.js';
import SearchInput from '../SearchInput/SearchInput.jsx';
import Claim from '../Claim/Claim.jsx';
import Business from '../../business/_index.js';

/* Search & select claims to add as premises to an argument
 */

export default class AddExplanationForm extends React.Component {

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
        //this.handleTypeToggle = this.handleTypeToggle.bind(this);
        this.handlePremisSearch = this.handlePremisSearch.bind(this);
        this.handlePremisResultClick = this.handlePremisResultClick.bind(this);
        this.handleArgumentPremisClick = this.handleArgumentPremisClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleTypeToggle(type){
        let newArgument = this.state.argument;
        newArgument.type = type;
        this.setState({ argument: newArgument });
    }

    handlePremisSearch(term){
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
                this.setState({ premis_search_results: [data.claim] });
			}).catch((err) => {
				console.error('search claim api call error', err);
			});
		}
    }

    handlePremisResultClick(premis){
        //a premis in the premis search - add it to the new argument when it's clicked
        var newArgument = this.state.argument;

        if (Business.validateNewPremis(premis, newArgument, this.props.parentClaim)){
            newArgument.premises.push(premis);
            this.setState({ argument: newArgument });
        }
    }

    handleArgumentPremisClick(premis){
        //when a premis that has been added to the argument is clicked, remove it from the argument
        var newArgument = this.state.argument;
        newArgument.premises = newArgument.premises.filter(function(statePremis){
            return (statePremis.id != premis.id);
        });
        this.setState({argument: newArgument});
    }

    handleSubmit(event){
        //when the publish button is clicked, set up the new argument JSON to be passed to the API
        event.preventDefault();

        var premisIdArray = this.state.argument.premises.map(function(premis){
            return premis.id;
        });
        
        API.postNewExplanation({
            parent_claim_id: this.props.parentClaim.id,
            type: this.state.argument.type,
            premise_ids: premisIdArray
        }).then((res) => {  
            this.props.updatedClaimHandler(res.data.claim);
        }).catch((err) => {
            console.error('API returned a fail', err);
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
                   The claim {this.props.parentClaim.text} requires one of the following explanations to be true:
                </h4>

                {/*<div className="add-argument-form__type-toggle">
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
                </div>*/}

                <div className="add-argument-form__premis-finder">
                    <div className="premis-finder">
                        <SearchInput submissionHandler={this.handlePremisSearch} placeholder="Search Premises"/>
                    
                        <div className="premis-finder__results">
                            {premisSearchResults}
                        </div>
                    </div>
                </div>

                <div className="add-argument-form__argument-simulator">
                    <Argument argumentObject={this.state.argument} premisClickHandler={this.handleArgumentPremisClick}/>
                </div>

                <div className="add-argument-form__submit">
                    <button onClick={this.handleSubmit}>Publish</button>
                </div>
			</div>
		);
	}
}