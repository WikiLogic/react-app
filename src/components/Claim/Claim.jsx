import React from 'react';
import StatusIndicator from 'Components/StatusIndicator/StatusIndicator';

/* Each Claim in the list of search results
 */

export default function Claim(props) {
  let cssClass = 'claim';
  if (props.isSelected) {
    cssClass = `${cssClass} claim--selected`;
  }

  if (typeof this.props.claim.labels !== 'undefined' && this.props.claim.labels.includes('Axiom')) {
    cssClass = `${cssClass} claim--axiom`;
  }

  return (
    <button className={cssClass} onClick={() => this.props.handleClick(this.props.claim)}>
      <div className="claim__body">
        <div className="claim__status-circle">
          <StatusIndicator state={this.props.claim.probability} type="circle" />
        </div>
        <div className="claim__text">
          {this.props.claim.text}
        </div>
      </div>
    </button>
  );
}

Claim.propTypes = {
  isSelected: React.PropTypes.bool.isRequired,
};
