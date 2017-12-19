import React from 'react';
import PropTypes from 'prop-types';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* The Argument Premises
 * Displays the claims that have been selected to be a part of the new argument.
 */
export default class GraphSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.resultClickHandler = this.resultClickHandler.bind(this);
  }

  resultClickHandler(premise) {
    this.props.resultClickHandler(premise);
  }

  render() {
    console.log('rendering', this.props);
    if (!this.props.results) {
      return <p>No results</p>;
    }

    if (this.props.results.length === 0) {
      return <p>No results</p>;
    }

    const premisesMarkup = [];
    for (let r = 0; r < this.props.results.length; r++) {
      premisesMarkup.push(
        <div key={this.props.results[r]._id} className="graph-search-results__result">
          <Claim claim={this.props.results[r]} isSelected={false}>
            <button
              className="button--secondary"
              onClick={() => {
                this.resultClickHandler(this.props.results[r]);
              }}
            >🡺</button>
          </Claim>
        </div>
      );
    }

    return (
      <div className="graph-search-results">
        {premisesMarkup}
      </div>
    );
  }
}

GraphSearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  resultClickHandler: PropTypes.func.isRequired
};

GraphSearchResults.defaultProps = {
  results: [],
};
