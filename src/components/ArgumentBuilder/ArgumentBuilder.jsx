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
      searchResults: [],
    };

    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.searchForExistingClaims = this.searchForExistingClaims.bind(this);
    this.addExistingPremis = this.addExistingPremis.bind(this);
    this.createAndAddNewPremis = this.createAndAddNewPremis.bind(this);
  }

  handleTextareaChange(newValue) {
    this.setState({
      textAreaValue: newValue
    });
  }


  searchForExistingClaims() {
    const term = this.state.textAreaValue;
    if (isNaN(term)) {
      API.searchClaimsByTerm(term)
        .then((data) => {
          this.setState({ searchResults: data.results });
        }).catch((err) => {
          console.error('argument builder call to API errored: ', err);
        });
    } else {
      API.getClaimDetailById(term)
        .then((data) => {
          this.setState({ searchResults: [data.claim] });
        }).catch((err) => {
          console.error('argument builder call to API errored: ', err);
        });
    }
  }

  addExistingPremis(premis) {
    // when a premis that has been added to the argument is clicked, remove it from the argument
    const newArgument = this.state.argument;
    newArgument.premises = newArgument.premises.filter(statePremis => statePremis.id !== premis.id);
    this.setState({ argument: newArgument });
  }

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
                <textarea className="form__input" id="new-claim-text" onChange={this.handleTextareaChange} />
              </div>

              <div className="layout-cols-2">
                <div className="layout-cols-2__left">
                  <button onClick={this.searchForExistingClaims}>Check for existing premises</button>
                </div>
                <div className="layout-cols-2__right">
                  <button onClick={this.createAndAddNewPremis}>Submit new premis</button>
                </div>
              </div>
            </div>

          </div>
          <div className="argument-builder__search">
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
