import React from 'react';
import Argument from 'WlComponents/Argument/Argument.jsx';
import API from 'WlAPI/api.js';
import SearchInput from 'WlComponents/SearchInput/SearchInput.jsx';
import Claim from 'WlComponents/Claim/Claim.jsx';
import Validate from 'WlServices/validate.js';
import Notify from 'WlServices/notify.js';

/* Search & select claims to add as premises to an argument
 */

export default class ArgumentBuilder extends React.Component {
  constructor(props) {
    super(props);
    // state is bundled inside an argument for ease in passing to the argument element
    this.state = {
      type: 'SUPPORTS',
      premises: [],
      premis_search_results: [],
    };

    this.handleTypeToggle = this.handleTypeToggle.bind(this);
    this.handlePremisSearch = this.handlePremisSearch.bind(this);
    this.handlePremisResultClick = this.handlePremisResultClick.bind(this);
    this.handleArgumentPremisClick = this.handleArgumentPremisClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTypeToggle(type) {
    const newArgument = this.state.argument;
    newArgument.type = type;
    this.setState({ argument: newArgument });
  }

  handlePremisSearch(term) {
    if (isNaN(term)) {
      API.searchClaimsByTerm(term)
        .then((data) => {
          this.setState({ premis_search_results: data.claims });
        }).catch((err) => {
          Notify.post(err);
        });
    } else {
      API.getClaimDetailById(term)
        .then((data) => {
          this.setState({ premis_search_results: [data.claim] });
        }).catch((err) => {
          Notify.post(err);
        });
    }
  }

  handlePremisResultClick(premis) {
    // a premis in the premis search - add it to the new argument when it's clicked
    const newArgument = this.state.argument;

    // if (Validate.newPremis(premis, newArgument, this.props.parentClaim)) {
    newArgument.premises.push(premis);
    this.setState({ argument: newArgument });
    // }
  }

  handleArgumentPremisClick(premis) {
    // when a premis that has been added to the argument is clicked, remove it from the argument
    const newArgument = this.state.argument;
    newArgument.premises = newArgument.premises.filter(statePremis => statePremis.id !== premis.id);
    this.setState({ argument: newArgument });
  }

  handleSubmit(event) {
    // when the publish button is clicked, set up the new argument JSON to be passed to the API
    event.preventDefault();

    const premisIdArray = this.state.argument.premises.map(premis => premis.id);

    this.props.submissionHandler(premisIdArray);
    // API.postNewArgument({
    //   parentClaimId: this.props.parentClaim.id,
    //   type: this.state.argument.type,
    //   premiseIds: premisIdArray,
    // }).then((res) => {
    //   this.props.updatedClaimHandler(res.data.claim);
    // }).catch((err) => {
    //   Notify.post(err);
    // });
  }

  render() {
    let premisSearchResults = null;
    if (this.state.premis_search_results.length > 0) {
      premisSearchResults = this.state.premis_search_results.map(premis =>
        (<Claim
          claim={premis}
          key={premis.id}
          handleClick={this.handlePremisResultClick}
          isSelected={false}
        />),
      );
    }

    return (
      <div className="add-argument-form">

        <div className="add-argument-form__premis-finder">
          <div className="premis-finder">

            <div className="premis-finder__results">
              {premisSearchResults}
            </div>
          </div>
        </div>

        <div className="add-argument-form__argument-simulator">
          <div className={`argument argument--${this.state.type}`}>
            <div className="argument__header">
              New {this.state.type} argument
            </div>
            <SearchInput
              submissionHandler={this.handlePremisSearch}
              placeholder="Search Claims"
            />
            Add existing claims as premises for this argument
            <div className="argument__body">
              premises...
            </div>
          </div>
        </div>

        <div className="add-argument-form__submit">
          <button onClick={this.handleSubmit}>Publish</button>
        </div>
      </div>
    );
  }
}

ArgumentBuilder.propTypes = {
  submissionHandler: React.PropTypes.func.isRequired,
};
