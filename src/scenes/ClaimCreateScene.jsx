import React from 'react';
import PropTypes from 'prop-types';
import AddClaimForm from 'src/components/AddClaimForm/AddClaimForm.jsx';
import API from 'src/API/api.js';

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
    API.postNewClaim({
      text: newClaimData.text,
      probability: newClaimData.probability,
    }).then((res) => {
      //go to res.data.claim._key
      this.props.history.push(`/claim/${res.data.claim._key}`);
    }).catch((err) => {
      console.error('new claim failed: ', err);
    });
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <h1>New Claim</h1>
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

ClaimCreateScene.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
