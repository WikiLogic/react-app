import React from 'react';
import AddClaimForm from 'WlComponents/AddClaimForm/AddClaimForm.jsx';

/**
 * The Search Results page
 * @prop {*} name 
 */
export default class ClaimCreateScene extends React.Component {
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
            Create a new Claim
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            <AddClaimForm />
          </div>
        </div>
      </div>
    );
  }
}
