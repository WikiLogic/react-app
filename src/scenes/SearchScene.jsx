import React from 'react';
import SearchForm from 'WlComponents/SearchForm/SearchForm.jsx';
import SearchResults from 'WlComponents/SearchResults/SearchResults.jsx';
import Loader from 'WlComponents/Loader/Loader.jsx';
import API from 'WlAPI/api.js';

/**
 * The Search Results page
 */
export default class SearchScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: null,
      isLoading: false
    };

    this.searchClaims = this.searchClaims.bind(this);
  }

  componentDidMount() {
    // get the search param to see if there is anything there
    const URLsearchTerm = window.wl.utils.urlParameter.get('s', this.props.location.search);

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
          this.setState({
            searchResults: data.results,
            isLoading: false
          });
        }).catch((err) => {
          this.setState({
            searchResults: null,
            isLoading: false
          });
          console.error('err: ', err);
        });
    } else {
      API.getClaimDetailById(search)
        .then((data) => {
          //TODO: open the claim detial page when searching by an id and there's one result
          this.setState({
            searchResults: [data.claim],
            isLoading: false
          });
        }).catch((err) => {
          this.setState({
            searchResults: null,
            isLoading: false
          });
          console.error('err: ', err);
        });
    }

    // add it to the url
    this.props.history.push(`/search?s=${search}`);

    // set the state
    this.setState({
      searchTerm: search,
      isLoading: true
    });
  }


  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <SearchForm
              submissionHandler={this.searchClaims}
              placeholder="Search Claims"
              label="Search"
              inputValue={this.state.searchTerm}
              id="search-scene-input"
            />
            <Loader isLoading={this.state.isLoading} />

            Filtering options...

          </div>
        </div>

        <div className="page__body">
          <div className="max-width-wrap">

            <SearchResults searchResults={this.state.searchResults} />

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
