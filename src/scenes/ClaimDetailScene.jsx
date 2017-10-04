import React from 'react';
import _ from 'lodash';
import API from 'WlAPI/api.js';
import Argument from 'WlComponents/Argument/Argument.jsx';
import StatusIndicator from 'WlComponents/StatusIndicator/StatusIndicator.jsx';
import ArgumentBuilder from 'WlComponents/ArgumentBuilder/ArgumentBuilder.jsx';

/**
 * The Search Results page
 * @prop {*} name 
 */
export default class ClaimDetailScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      claim: null,
      argumentBuilder: false
    };
    this.premisClickHandler = this.premisClickHandler.bind(this);
    this.openArgumentBuilder = this.openArgumentBuilder.bind(this);
    this.updatedClaimHandler = this.updatedClaimHandler.bind(this);
    this.closeNewArgumentModal = this.closeNewArgumentModal.bind(this);
    this.closeNewExplanationModal = this.closeNewExplanationModal.bind(this);
    this.renderArguments = this.renderArguments.bind(this);
    this.newArgumentSubmissionHandler = this.newArgumentSubmissionHandler.bind(this);
  }

  componentDidMount() {
    console.log('props', this.props.match.params.claimId);
    //get the claim for this detail to show
    API.getClaimDetailById(this.props.match.params.claimId)
      .then((data) => {
        this.setState({ claim: data.claim });
      }).catch((err) => {
        console.log('error', err);
      });
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
        console.log('error', err);
      });
  }

  openArgumentBuilder(type) {
    this.setState({
      argumentBuilder: type,
    });
  }

  newArgumentSubmissionHandler(newArgument) {
    console.log('new argument submission!', newArgument);
    const premiseIds = [];
    _.forEach(newArgument.premises, (premise) => {
      console.log("premise", premise);
      premiseIds.push(premise._id);
    });
    console.log('premiseIds', premiseIds);
    API.postNewArgument({
      parentClaimId: this.state.claim._id,
      type: newArgument.type,
      premiseIds: premiseIds
    }).then((res) => {
      console.log('claim with new argument returned!', res);
      this.setState({
        claims: res.data.claim
      });
    }).catch((err) => {
      console.error('new argument failed', err);
    });
  }

  updatedClaimHandler() {
    // when a new argument is added the API returns the updated parent claim, so we should replace!
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

  renderArguments() {
    let argumentMarkup = <div>No arguments</div>;
    if (this.state.claim.arguments.length > 0) {
      argumentMarkup = [];
      for (let a = 0; a < this.state.claim.arguments.length; a++) {
        argumentMarkup.push(
          <Argument
            argumentObject={this.state.claim.arguments[a]}
            key={this.state.claim.arguments[a]._key}
            premisClickHandler={this.premisClickHandler}
          />
        );
      }
    }
    return argumentMarkup;
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            Claim Detail / inspector / explorer.

          </div>
        </div>
        {(this.state.claim &&
          <div className="page__body claim-detail">

            <div className="claim-detail__header max-width-wrap">
              <div className="claim-detail__status">
                <StatusIndicator probability={this.state.claim.probability} />
              </div>
              <div className="claim-detail__text">
                {this.state.claim.text}
              </div>
            </div>

            <div className="bg-pattern-checkered">
              <div className="max-width-wrap">

                <div className="claim-detail__arg-builder">
                  <ArgumentBuilder submissionHandler={this.newArgumentSubmissionHandler} />
                </div>

              </div>
            </div>

            <div className="claim-detail__arguments max-width-wrap">
              {this.renderArguments()}
            </div>

          </div>
        )}
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


// ClaimDetail.propTypes = {
//   claim: React.PropTypes.shape({
//     _key: React.PropTypes.string.isRequired,
//     _id: React.PropTypes.string.isRequired,
//     text: React.PropTypes.string.isRequired,
//     probability: React.PropTypes.number,
//     arguments: React.PropTypes.array,
//   }).isRequired,
//   premisClickHandler: React.PropTypes.func.isRequired,
//   updatedClaimHandler: React.PropTypes.func.isRequired,
//   highlightedPremisId: React.PropTypes.string.isRequired,
// };

// ClaimDetail.defaultProps = {
//   claim: React.PropTypes.shape({
//     probability: 50,
//     arguments: [],
//   }),
// };
