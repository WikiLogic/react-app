import React from 'react';
import API from 'WlAPI/api.js';
import urlParameter from 'WlServices/urlParameter.js';
import Notify from 'WlServices/notify.js';
import Code from 'WlComponents/Code/Code.jsx';
import InputButton from 'WlComponents/InputButton/InputButton.jsx';

/**
 * The Search Results page
 */
export default class ApiDev extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      body: {},
    };

    this.searchClaims = this.searchClaims.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.get = this.get.bind(this);
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
          this.setState({ searchResults: data.claims });
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

  updateUrl(newUrl) {
    this.setState({
      url: newUrl,
    });
  }

  get(){

  }


  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            The API

          </div>
        </div>

        <div className="page__body">
          <div className="max-width-wrap">

            <div className="layout-cols-2">
              <div className="layout-cols-2__left">

                <div className="flex-row">
                  <div style={{ padding: '5px' }}>/api/</div>
                  <InputButton
                    inputType="text"
                    inputValue={this.state.url}
                    buttonText="GET"
                    submitHandler={this.get}
                    onChange={this.updateUrl}
                  />
                </div>

                <br />

                <div>
                  <textarea className="width-100" name="" id="" cols="30" rows="10" />
                </div>

                <div className="text-right">
                  <button>POST</button>
                </div>

              </div>
              <div className="layout-cols-2__gap" />
              <div className="layout-cols-2__right text-left">
                Result:

                <Code code={{
                  data: 'data',
                  errors: 'errors',
                }}
                />

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

ApiDev.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  location: React.PropTypes.shape({
    search: React.PropTypes.string.isRequired,
  }).isRequired,
};
