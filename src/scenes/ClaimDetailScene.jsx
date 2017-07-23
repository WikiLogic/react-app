import React from 'react';
import ClaimChain from 'WlComponents/ClaimChain/ClaimChain.jsx';

/**
 * The Search Results page
 * @prop {*} name 
 */
export default class ClaimDetailScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <ClaimChain topClaimId={this.props.match.params.claimId} />

          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            layout
          </div>
        </div>
      </div>
    );
  }
}

ClaimDetailScene.propTypes = {
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      claimId: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
