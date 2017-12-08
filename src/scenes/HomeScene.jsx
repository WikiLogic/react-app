import React from 'react';
import SearchForm from 'WlComponents/SearchForm/SearchForm.jsx';

/**
 * The Home page
 * @prop {*} name 
 */
export default class HomeScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_results: [],
    };

    this.searchClaims = this.searchClaims.bind(this);
  }

  searchClaims(search) {
    // go to /search?s=term
    this.props.history.push(`/search?s=${search}`);
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            You&#39;ve come home

            <SearchForm
              id="home-scene-search-input"
              label="Search"
              submissionHandler={this.searchClaims}
              placeholder="Search Claims"
            />

          </div>
        </div>
      </div>
    );
  }
}

HomeScene.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};
