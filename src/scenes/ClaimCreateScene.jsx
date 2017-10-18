import React from 'react';
import AddClaimForm from 'WlComponents/AddClaimForm/AddClaimForm.jsx';
import API from 'WlAPI/api.js';

/**
 * The Search Results page
 * @prop {*} name 
 */
export default class ClaimCreateScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(newClaimData) {
    console.log('newClaimData', newClaimData);
    API.postNewClaim({
      text: newClaimData.text,
      probability: newClaimData.value,
    }).then((data) => {
      console.log('new claim!', data);
    }).catch((err) => {
      console.error('new claim failed: ', err);
    });
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
            <AddClaimForm submitHandler={this.submitHandler} />
          </div>
        </div>
      </div>
    );
  }
}
