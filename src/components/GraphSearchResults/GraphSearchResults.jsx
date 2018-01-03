import React from 'react';
import PropTypes from 'prop-types';
// import { action } from 'mobx';
import { observer } from 'mobx-react';
import Claim from '../Claim/Claim.jsx';
import AddClaimForm from 'src/components/AddClaimForm/AddClaimForm.jsx';
import NewClaimStore from 'src/stores/newClaim.js';

/**
 * The Argument Premises
 * Displays the claims that have been selected to be a part of the new argument.
 */

@observer
export default class GraphSearchResults extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    resultClickHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.resultClickHandler = this.resultClickHandler.bind(this);
  }

  resultClickHandler(premise) {
    this.props.resultClickHandler(premise);
  }

  render() {
    let newClaimMarkup = null;

    if (this.props.store.results.length === 0 && this.props.store.term !== '') {
      newClaimMarkup = (
        <div>
          <p>No results for {this.props.store.term}</p>
          <div className="pad" />
          <AddClaimForm
            newClaimStore={new NewClaimStore(this.props.store.term)}
          />
        </div>
      );
    }

    const premisesMarkup = [];
    for (let r = 0; r < this.props.store.results.length; r++) {
      premisesMarkup.push(
        <div key={this.props.store.results[r]._id} className="graph-search-results__result">
          <Claim claim={this.props.store.results[r]} isSelected={false}>
            <button
              className="button--secondary"
              onClick={() => {
                this.resultClickHandler(this.props.store.results[r]);
              }}
            >🡺</button>
          </Claim>
        </div>
      );
    }

    return (
      <div className="graph-search-results">
        {newClaimMarkup}
        {premisesMarkup}
      </div>
    );
  }
}
