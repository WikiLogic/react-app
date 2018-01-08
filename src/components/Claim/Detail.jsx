import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import API from 'src/API/api.js';
import Argument from 'src/components/Argument/Argument.jsx';
import StatusIndicator from 'src/components/StatusIndicator/StatusIndicator.jsx';
import ArgumentBuilder from 'src/components/ArgumentBuilder/ArgumentBuilder.jsx';

/**
 * The claim detail view
 */

@observer
export default class ClaimDetail extends React.Component {
  static propTypes = {
    claimStore: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      claim: null,
      argumentBuilder: false
    };
    this.premisClickHandler = this.premisClickHandler.bind(this);
    this.renderArguments = this.renderArguments.bind(this);
    this.newArgumentSubmissionHandler = this.newArgumentSubmissionHandler.bind(this);
  }

  // the focus premises get their own click handler as the logic is a bit different
  premisClickHandler(premise, index) {
    console.log('premise click!', premise, index);
  }

  newArgumentSubmissionHandler(newArgument) {
    const premiseIds = [];
    newArgument.premises.forEach((premise) => {
      premiseIds.push(premise._id);
    });

    API.postNewArgument({
      parentClaimId: this.props.claimStore._id,
      type: newArgument.type,
      premiseIds: premiseIds
    }).then((res) => {
      this.setState({
        claims: res.data.claim
      });
    }).catch((err) => {
      console.error('new argument failed', err);
    });
  }

  renderArguments() {
    let argumentMarkup = <div>No arguments</div>;
    console.log('this.props.claimStore', this.props.claimStore);
    if (this.props.claimStore.arguments.length > 0) {
      argumentMarkup = [];
      for (let a = 0; a < this.props.claimStore.arguments.length; a++) {
        argumentMarkup.push(
          <Argument
            argumentObject={this.props.claimStore.arguments[a]}
            key={this.props.claimStore.arguments[a]._key}
            premisClickHandler={this.premisClickHandler}
          />
        );
      }
    }
    return argumentMarkup;
  }

  render() {
    return (
      <div className="claim-detail">

        <div className="claim-detail__header max-width-wrap">
          <div className="claim-detail__status">
            <StatusIndicator probability={this.props.claimStore.probability} />
          </div>
          <div className="claim-detail__text">
            {this.props.claimStore.text}
          </div>
        </div>

        {(this.props.isLoggedIn &&
          <div className="bg-pattern-checkered">
            <div className="max-width-wrap">

              <div className="claim-detail__arg-builder">
                <ArgumentBuilder submissionHandler={this.newArgumentSubmissionHandler} />
              </div>

            </div>
          </div>
        )}

        <div className="claim-detail__arguments max-width-wrap">
          {this.renderArguments()}
        </div>

      </div>
    );
  }
}
