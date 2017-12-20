import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import API from 'WlAPI/api.js';
import Claims from 'WlStores/claims.js';

import SearchForm from 'WlComponents/SearchForm/SearchForm.jsx';
import GraphSearchResults from 'WlComponents/GraphSearchResults/GraphSearchResults.jsx';
// import ArgumentBuilder from 'WlComponents/ArgumentBuilder/ArgumentBuilder.jsx';
// import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';
import GraphSvg from 'WlComponents/SVG/GraphSvg.jsx';
import GraphClaim from 'WlComponents/SVG/GraphClaim.jsx';
import SVGtext from 'WlComponents/SVGels/SVGtext';

/**
 * The Home page
 * @prop {*} name 
 */

@observer
export default class GraphScene extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: [],
      gridUnit: 100,
      padUnit: 4,
      graphClaim: null
    };

    // this.searchClaims = this.searchClaims.bind(this);
    // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.loadClaim = this.loadClaim.bind(this);
    this.newArgumentSubmissionHandler = this.newArgumentSubmissionHandler.bind(this);
  }

  componentDidMount() {
    // Claims.getList().then((claims) => {
    //   console.log('CLAIMS!', claims);
    //   this.setState({
    //     searchResults: claims
    //   });
    // }).catch((err) => {
    //   console.error('get claims error', err);
    // });
  }

  // @action
  // handleSearchSubmit(search) {
  //   this.props.store.search.term = search;
  // }

  // searchClaims(search) {
  //   // run the search
  //   if (isNaN(search)) {
  //     API.searchClaimsByTerm(search)
  //       .then((data) => {
  //         this.setState({
  //           searchResults: data.results,
  //           isLoading: false
  //         });
  //       }).catch((err) => {
  //         this.setState({
  //           searchResults: null,
  //           isLoading: false
  //         });
  //         console.log('error', err);
  //       });
  //   } else {
  //     API.getClaimDetailById(search)
  //       .then((data) => {
  //         this.setState({
  //           searchResults: [data.claim],
  //           isLoading: false
  //         });
  //       }).catch((err) => {
  //         this.setState({
  //           searchResults: null,
  //           isLoading: false
  //         });
  //         console.log('error', err);
  //       });
  //   }

  //   // set the state
  //   this.setState({
  //     searchTerm: search,
  //     isLoading: true
  //   });
  // }

  loadClaim(result) {
    this.setState({
      graphClaim: result
    });
    //fire off a request to the API to get the args for this claim
    API.getClaimDetailById(result._key)
      .then((data) => {
        this.setState({
          graphClaim: data.claim
        });
      }).catch((err) => {
        console.log('Trying to load claim detail error', err);
      });
  }

  newArgumentSubmissionHandler(newArgument) {
    console.log('new argument submission!', newArgument);
    const premiseIds = [];
    newArgument.premises.each((premise) => {
      console.log('premise', premise);
      premiseIds.push(premise._id);
    });
    console.log('premiseIds', premiseIds);
    API.postNewArgument({
      parentClaimId: this.state.claim._id,
      type: newArgument.type,
      premiseIds: premiseIds
    }).then((res) => {
      console.log('claim with new argument returned!', res);
      this.setState({
        claims: res.data.claim
      });
    }).catch((err) => {
      console.error('new argument failed', err);
    });
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <SearchForm
              store={this.props.store.searchStore}
              placeholder="Search Claims"
              label="Search"
              inputValue={this.props.store.search.term}
              id="graph-scene-search-input"
            />

          </div>
        </div>
        <div className="page__body no-padding">
          <div className="sidebar-layout">

            <div className="sidebar-layout__side padding">
              <GraphSearchResults
                store={this.props.store.searchStore}
                resultClickHandler={this.loadClaim}
              />
              {/* <ArgumentBuilder submissionHandler={this.newArgumentSubmissionHandler} /> */}
            </div>

            <div className="sidebar-layout__main no-padding">
              <GraphSvg>

                {(this.state.graphClaim &&
                  <GraphClaim
                    store={this.state.store.graphStore}
                    claim={this.state.graphClaim}
                    premiseClickHandler={this.loadClaim}
                    gridUnit={this.state.gridUnit}
                    padUnit={this.state.padUnit}
                  />
                )}
                {(!this.state.graphclaim &&
                  <SVGtext
                    text="Message to search claims and click them to load into this graph. Also a button to load an example"
                    x={-200}
                    y={-300}
                    width={400}
                    height={20}
                  />
                )}

              </GraphSvg>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
