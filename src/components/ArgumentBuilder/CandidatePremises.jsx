import React from 'react';
import Claim from 'WlComponents/Claim/Claim.jsx';

/* The Candidate Premises
 * In the argument builder directory as it's currently specific to the argument builder
 */
export default class CandidatePremises extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddCandidateToArgument = this.handleAddCandidateToArgument.bind(this);
  }

  handleAddCandidateToArgument(claim){
    console.log('add claim to argument click!', claim);
  }

  render() {
    if (!this.props.premises) {
      return <p>No results</p>;
    }

    if (this.props.premises.length === 0) {
      return <p>No results</p>;
    }

    const searchResultMarkup = [];
    for (let r = 0; r < this.props.premises.length; r++) {
      searchResultMarkup.push(
        <div key={this.props.premises[r]._id} className="search-results__result">
          <Claim claim={this.props.premises[r]} isSelected={false}>
            <button
              onClick={() => {
                this.handleAddCandidateToArgument(this.props.premises[r]);
              }}
            >Add existing claim as a premise</button>
          </Claim>
        </div>
      );
    }

    return (
      <div className="search-results">
        {searchResultMarkup}
      </div>
    );
  }
}

CandidatePremises.propTypes = {
  premises: React.PropTypes.arrayOf(React.PropTypes.object),
};

CandidatePremises.defaultProps = {
  premises: [],
};
