import React from 'react';
import API from 'WlAPI/api.js';
import SearchResults from 'WlComponents/SearchResults/SearchResults.jsx';
/* Search & select claims to add as premises to an argument
 */

export default class ArgumentBuilder extends React.Component {
  constructor(props) {
    super(props);
    // state is bundled inside an argument for ease in passing to the argument element
    this.state = {
      type: 'SUPPORTS',
      premises: [],
      textAreaValue: '',
      dupesPresented: false,
      searchResults: [],
    };

    this.newPremiseCheckWait = null;
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handlePremisSubmission = this.handlePremisSubmission.bind(this);
    this.searchForExistingClaims = this.searchForExistingClaims.bind(this);
    this.addExistingPremis = this.addExistingPremis.bind(this);
    this.createAndAddNewPremis = this.createAndAddNewPremis.bind(this);
  }

  handleTextareaChange(event) {

    clearTimeout(this.newPremiseCheckWait);
    this.newPremiseCheckWait = setTimeout(() => {
      this.searchForExistingClaims();
    }, 3000);

    this.setState({
      textAreaValue: event.target.value,
      dupesPresented: false
    });
  }

  handlePremisSubmission() {
    if (!this.state.dupesPresented) {
      this.searchForExistingClaims();
    } else {

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

  //if one of the claims found by the search turns out to be what the user is trying to add to the argument, click it to add it to the argument!
  addExistingPremis(premis) {
    // when a premis that has been added to the argument is clicked, remove it from the argument
    const newArgument = this.state.argument;
    newArgument.premises = newArgument.premises.filter(statePremis => statePremis.id !== premis.id);
    this.setState({ argument: newArgument });
  }

  //run this only after the user has seen a list of premises that might be dups
  //creates a new claim with a default probability then adds it to the argument we're building
  createAndAddNewPremis() {
    API.postNewClaim({
      text: this.state.textAreaValue,
      probability: 50,
    }).then((data) => {
      console.log('new claim! add it to this argument :)', data);
    }).catch((err) => {
      console.error('new claim failed: ', err);
    });
  }

  render() {
    return (
      <div className={`argument-builder argument-builder--${this.state.type}`}>

        <div className="argument-builder__sim">
          <div className="argument-builder__title">
            {this.props.title}
          </div>
          <div className="argument-builder__body">
            premises...
          </div>
          <div className="argument-builder__submit">
            <button onClick={this.handleSubmit}>Publish new argument</button>
          </div>
        </div>

        <div className="argument-builder__workbench">
          <div className="argument-builder__create">

            <div className="form">
              <div className="form__label">
                <label className="form__label-text" htmlFor="new-claim-text">
                  Write up a new premise to use in this argument
                </label>
                <textarea className="form__input" id="new-claim-text" onChange={this.handleTextareaChange} value={this.state.textAreaValue} />
                <button className="argument-builder__create-new-premise-button" onClick={this.createAndAddNewPremis} disabled={!this.state.dupesPresented}>Create as a new claim and add to this argument</button>
              </div>
            </div>

          </div>
          <div className="argument-builder__search">
            {(this.state.searchResults.length > 0 && 
              <p>Click one of the existing claims below to add as a premise to this argument</p>
            )}
            <SearchResults searchResults={this.state.searchResults} />
          </div>
        </div>
      </div>
    );
  }
}

ArgumentBuilder.propTypes = {
  title: React.PropTypes.string
};

ArgumentBuilder.defaultProps = {
  title: 'New argument:'
};
