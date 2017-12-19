import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import API from 'WlAPI/api.js';
import ArgumentPremises from './ArgumentPremises.jsx';
import CandidatePremises from './CandidatePremises.jsx';
/* Search & select claims to add as premises to an argument
 */

export default class ArgumentBuilder extends React.Component {
  constructor(props) {
    super(props);
    // state is bundled inside an argument for ease in passing to the argument element
    this.state = {
      title: 'New supporting argument',
      type: 'SUPPORTS',
      showWorkBench: false,
      premises: [],
      textAreaValue: '',
      dupesPresented: false,
      searchResults: [],
    };

    this.newPremiseCheckWait = null;
    this.setNewArgumentType = this.setNewArgumentType.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handlePremisSubmission = this.handlePremisSubmission.bind(this);
    this.searchForExistingClaims = this.searchForExistingClaims.bind(this);
    this.addExistingPremis = this.addExistingPremis.bind(this);
    this.removePremise = this.removePremise.bind(this);
    this.createAndAddNewPremis = this.createAndAddNewPremis.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  setNewArgumentType(side) {
    this.setState({
      type: side,
      showWorkBench: true
    });
  }

  handleTextareaChange(event) {

    clearTimeout(this.newPremiseCheckWait);
    this.newPremiseCheckWait = setTimeout(() => {
      this.searchForExistingClaims();
    }, 1000);

    this.setState({
      textAreaValue: event.target.value,
      dupesPresented: false
    });
  }

  handlePremisSubmission() {
    if (!this.state.dupesPresented) {
      this.searchForExistingClaims();
    }
  }

  //Before submitting the premis as a new one, fire off a search to see if there are any existing ones that it might be
  searchForExistingClaims() {
    const term = this.state.textAreaValue;
    console.log('term', term);
    if (isNaN(term)) {
      API.searchClaimsByTerm(term)
        .then((data) => {
          this.setState({
            searchResults: data.results,
            dupesPresented: true
          });
        }).catch((err) => {
          console.error('argument builder call to API errored: ', err);
        });
    } else {
      API.getClaimDetailById(term)
        .then((data) => {
          this.setState({
            searchResults: [data.claim],
            dupesPresented: true
          });
        }).catch((err) => {
          console.error('argument builder call to API errored: ', err);
        });
    }
  }

  //if one of the claims found by the search turns out to be what the user is trying to add to the argument, 
  //click it to add it to the argument!
  addExistingPremis(premis) {
    const newPremisesArray = this.state.premises;
    newPremisesArray.push(premis);
    this.setState({
      premises: newPremisesArray
    });
  }

  //run this only after the user has seen a list of premises that might be dups
  //creates a new claim with a default probability then adds it to the argument we're building
  createAndAddNewPremis() {
    API.postNewClaim({
      text: this.state.textAreaValue,
      probability: 50,
    }).then((res) => {

      const newPremisesArray = this.state.premises;
      newPremisesArray.push(res.data.claim);

      const newSearchResultsArray = this.state.searchResults;
      newSearchResultsArray.push(res.data.claim);

      this.setState({
        premises: newPremisesArray,
        searchResults: newSearchResultsArray
      });

    }).catch((err) => {
      console.error('new claim failed: ', err);
    });
  }

  removePremise(premiseToRemove) {

    const newPremiseArray = _.remove(this.state.premises, (premise) => {
      return premise._id !== premiseToRemove._id;
    });

    this.setState({
      premises: newPremiseArray
    });
  }

  handlePublish() {
    this.props.submissionHandler({
      type: this.state.type,
      premises: this.state.premises //give the ids of the two 'for' claims we created above
    });
  }

  render() {
    let argumentIsValid = false;
    if (this.state.premises.length > 0) {
      argumentIsValid = true;
    }

    return (
      <div className={`argument-builder argument-builder--${this.state.type}`}>

        <div className="argument-builder__side-buttons layout-cols-2">
          <div className="layout-cols-2__left">
            <button className="button--secondary" onClick={() => { this.setNewArgumentType('FOR'); }} >
              Build a supporting argument
            </button>
          </div>
          <div className="layout-cols-2__right">
            <button className="button--secondary" onClick={() => { this.setNewArgumentType('AGAINST'); }} >
              Build an opposing argument
            </button>
          </div>
        </div>

        {(this.state.showWorkBench &&
          <div className="argument-builder__workbench">
            <div className="argument-builder__sim">

              <div className="layout-cols-2">
                <div className="layout-cols-2__left">
                  {(this.state.type === 'FOR' &&
                    <h2>New supporting argument:</h2>
                  )}
                  {(this.state.type === 'AGAINST' &&
                    <h2>New opposing argument:</h2>
                  )}
                </div>
                <div className="layout-cols-2__right">
                  <button
                    className="button--secondary"
                    onClick={() => {
                      this.setState({ showWorkBench: false });
                    }}
                  >Close argument builder</button>
                </div>
              </div>


              <div className="argument-builder__body">
                <ArgumentPremises
                  premises={this.state.premises}
                  removePremise={this.removePremise}
                />
              </div>
            </div>
            <div className="argument-builder__publish">
              <button onClick={this.handlePublish} disabled={!argumentIsValid}>Publish new argument</button>
            </div>

            <div className="argument-builder__crafting-table">
              <div className="argument-builder__create">

                <div className="form">
                  <div className="form__label">
                    <label className="form__label-text" htmlFor="new-claim-text">
                      Write up a new premise to use in this argument
                    </label>
                    <textarea className="form__input" id="new-claim-text" onChange={this.handleTextareaChange} value={this.state.textAreaValue} />
                    <div className="argument-builder__create-new-premise-button">
                      <button className="button--secondary" onClick={this.createAndAddNewPremis} disabled={!this.state.dupesPresented}>Create new claim and add as a premise</button>
                    </div>
                  </div>
                </div>

              </div>
              <div className="argument-builder__search">
                {(this.state.searchResults.length > 0 &&
                  <p>Click one of the existing claims below to add as a premise to this argument</p>
                )}
                <CandidatePremises
                  premises={this.state.searchResults}
                  premisSelectionHandler={this.addExistingPremis}
                />
              </div>
            </div>

          </div>
        )}

      </div>
    );
  }
}

ArgumentBuilder.propTypes = {
  submissionHandler: PropTypes.func.isRequired
};
