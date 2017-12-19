import React from 'react';
import PropTypes from 'prop-types';
import API from 'WlAPI/api.js';
import ClaimDetail from 'WlComponents/ClaimDetail/ClaimDetail.jsx';

/* Start with a claim ID. Ask the API for that claim.
 * Lets the user go deeper into the premises bloew that claim.
 */

export default class ClaimChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      chain: [],
    };
    this.premisClickHandler = this.premisClickHandler.bind(this);
    this.updatedClaimHandler = this.updatedClaimHandler.bind(this);
  }

  componentDidMount() {
    // when this view opens, the ID of the claim is passed in by the props - ask the API for it!
    API.getClaimDetailById(this.props.topClaimId)
      .then((data) => {
        this.setState({
          isLoading: false,
          chain: [{
            claim: data.claim,
            highlighted_premis_id: '',
          }],
        });
      }).catch((err) => {
        console.error('err: ', err);
      });
  }


  premisClickHandler(premis, index) {
    // When a chain link premis is clicked, we need to:
    let newChain = this.state.chain;

    // clear out any lower level rows. 
    newChain = newChain.slice(0, index + 1);

    // highlight the premis that was clicked
    newChain[index].highlighted_premis_id = premis.id;

    // load in the arguments of that premis into the next level
    API.getClaimDetailById(premis.id)
      .then((data) => {
        newChain.push({
          claim: data.claim,
          highlighted_premis_id: '',
        });

        this.setState({ chain: newChain });
      }).catch((err) => {
        console.error('err: ', err);
      });
  }

  updatedClaimHandler(claim, index) {
    // when a claim in the chain is updated (eg by adding a new argument) - 
    // this will replace that link in the chain
    const newChain = this.state.chain;
    newChain[index].claim = claim;

    this.setState({ chain: newChain });
  }

  render() {
    let theChain = null;

    if (this.state.isLoading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    if (this.state.chain.length > 0) {
      theChain = this.state.chain.map((chainLink, index) => {
        if (Object.prototype.hasOwnProperty.call(chainLink, 'claim')) {
          return (
            <ClaimDetail
              claim={chainLink.claim}
              key={chainLink.claim.id}
              highlightedPremisId={chainLink.highlighted_premis_id}
              premisClickHandler={(premis) => { this.premisClickHandler(premis, index); }}
              updatedClaimHandler={(claim) => { this.updatedClaimHandler(claim, index); }}
            />
          );
        }
        return null;
      });
    }

    return (
      <div>
        {theChain}
      </div>
    );
  }
}

ClaimChain.propTypes = {
  topClaimId: PropTypes.string.isRequired,
};
