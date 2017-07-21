import React from 'react';
import AddClaimForm from 'Components/AddClaimForm/AddClaimForm.jsx';

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
      <div className="new-claim-layout">
        <div className="new-claim-layout__header">
          <div className="max-width-wrap">

            <AddClaimForm />

          </div>
        </div>
        <div className="new-claim-layout__results">
          <div className="max-width-wrap">
            results here
          </div>
        </div>
      </div>
    );
  }
}
