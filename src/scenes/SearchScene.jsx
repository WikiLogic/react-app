import React from 'react';
import SearchInput from 'WlComponents/SearchInput/SearchInput.jsx';
import SearchResults from 'WlComponents/SearchResults/SearchResults.jsx';
import API from 'WlAPI/api.js';
import urlParameter from 'WlServices/urlParameter.js';
import Notify from 'WlServices/notify.js';

/**
 * The Search Results page
 */
export default class SearchScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_term: '',
      search_results: [],
    };

    this.searchClaims = this.searchClaims.bind(this);
  }

  componentDidMount() {
    // get the search param to see if there is anything there
    const URLsearchTerm = urlParameter.get('s', this.props.location.search);

    // if there is
    if (URLsearchTerm) {
      // and run the search
      this.searchClaims(URLsearchTerm);
    }
  }

  searchClaims(search) {
    // run the search
    if (isNaN(search)) {
      API.searchClaimsByTerm(search)
        .then((data) => {
          this.setState({ search_results: data.claims });
        }).catch((err) => {
          Notify.post(err);
        });
    } else {
      API.getClaimDetailById(search)
        .then((data) => {
          this.setState({ focused_claim: data.claim });
        }).catch((err) => {
          Notify.post(err);
        });
    }

    // add it to the url
    this.props.history.push(`/search?s=${search}`);

    // set the state
    this.setState({
      search_term: search,
    });
  }


  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <SearchInput
              submissionHandler={this.searchClaims}
              placeholder="Search Claims"
              inputValue={this.state.search_term}
            />

            Filtering options...

          </div>
        </div>

        <div className="page__body">
          <div className="max-width-wrap">

            <SearchResults search_results={this.state.search_results} />

          </div>
        </div>
      </div>
    );
  }
}

SearchScene.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  location: React.PropTypes.shape({
    search: React.PropTypes.string.isRequired,
  }).isRequired,
};
