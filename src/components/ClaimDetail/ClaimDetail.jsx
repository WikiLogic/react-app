import React from 'react';
import Argument from 'WlComponents/Argument/Argument.jsx';
import StatusIndicator from 'WlComponents/StatusIndicator/StatusIndicator.jsx';
import Modal from 'WlComponents/Modal/Modal.jsx';
import AddArgumentForm from 'WlComponents/AddArgumentForm/AddArgumentForm.jsx';
import AddExplanationForm from 'WlComponents/AddExplanationForm/AddExplanationForm.jsx';

/* A claim
 * and all it's arguments
 * Also the options to add arguments - eventually
 */

export default class ClaimDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight_premis_id: '',
      new_argument_modal_open: false,
      new_explanation_modal_open: false,
    };
    this.premisClickHandler = this.premisClickHandler.bind(this);
    this.openNewArgumentModal = this.openNewArgumentModal.bind(this);
    this.openNewExplanationModal = this.openNewExplanationModal.bind(this);
    this.updatedClaimHandler = this.updatedClaimHandler.bind(this);
    this.closeNewArgumentModal = this.closeNewArgumentModal.bind(this);
    this.closeNewExplanationModal = this.closeNewExplanationModal.bind(this);
  }

  // When this claim chain recieves new props that means there's a new focus argument. 
  // So this clears out the state
  componentWillReceiveProps() {
    this.setState({
      highlight_premis_id: '',
      new_argument_modal_open: false,
      new_explanation_modal_open: false,
    });
  }

  // the focus premises get their own click handler as the logic is a bit different
  premisClickHandler(premis) {
    this.props.premisClickHandler(premis);
  }

  openNewArgumentModal() {
    this.setState({
      new_argument_modal_open: true,
    });
  }

  openNewExplanationModal() {
    this.setState({
      new_explanation_modal_open: true,
    });
  }

  updatedClaimHandler(claim) {
    // when a new argument is added the API returns the updated parent claim, so we should replace!
    this.props.updatedClaimHandler(claim);
    this.setState({
      new_argument_modal_open: false,
    });
  }

  closeNewArgumentModal() {
    this.setState({
      new_argument_modal_open: false,
    });
  }

  closeNewExplanationModal() {
    this.setState({
      new_explanation_modal_open: false,
    });
  }

  render() {
    if (typeof this.props.claim.text === 'undefined') { return null; }
    let argumentMarkup = null;
    // the arguments
    if (this.props.claim.arguments.length > 0) {
      argumentMarkup = this.props.claim.arguments.map(argumentObject => (
        <Argument
          argumentObject={argumentObject}
          key={argumentObject.id}
          highlightedPremisId={this.props.highlightedPremisId}
          premisClickHandler={this.premisClickHandler}
        />
      ));
    } else {
      argumentMarkup = (
        <div>
          No arguments -
          <a href="http://www.wikilogicfoundation.org/get-involved/" target="_blank" rel="noopener noreferrer">
            sign up
          </a> to add your own!
        </div>
      );
    }

    return (
      <div className="claim-detail">
        <div className="claim-detail__header">
          <div className="claim-detail__text">
            {this.props.claim.text}
          </div>
        </div>


        <div className="claim-detail__status">
          <StatusIndicator state={this.props.claim.state} />
        </div>

        <div className="claim-detail__options">
          <button className="button" onClick={this.openNewExplanationModal}>
            This claim can be explained by...
          </button>
          <button className="button" onClick={this.openNewArgumentModal}>
            New Argument +
          </button>
        </div>

        {/* The new explanation modal */}
        <Modal
          show={this.state.new_explanation_modal_open}
          title="New Explanation"
          onClose={this.closeNewExplanationModal}
        >
          <AddExplanationForm
            parentClaim={this.props.claim}
            updatedClaimHandler={this.updatedClaimHandler}
          />
        </Modal>

        {/* The new argument modal */}
        <Modal
          show={this.state.new_argument_modal_open}
          title="New Argument"
          onClose={this.closeNewArgumentModal}
        >
          <AddArgumentForm
            parentClaim={this.props.claim}
            updatedClaimHandler={this.updatedClaimHandler}
          />
        </Modal>


        <div className="claim-detail__arguments">
          {argumentMarkup}
        </div>

      </div>
    );
  }
}

ClaimDetail.propTypes = {
  claim: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    state: React.PropTypes.number.isRequired,
    arguments: React.PropTypes.array.isRequired,
  }).isRequired,
  premisClickHandler: React.PropTypes.func.isRequired,
  updatedClaimHandler: React.PropTypes.func.isRequired,
  highlightedPremisId: React.PropTypes.string.isRequired,
};
