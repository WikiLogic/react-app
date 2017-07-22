import React from 'react';

/**
 * The Authentication page (logging in!)
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
      <div className="main-layout">

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
