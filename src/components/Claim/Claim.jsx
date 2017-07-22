import React from 'react';
import StatusIndicator from 'WlComponents/StatusIndicator/StatusIndicator.jsx';

/* Each Claim in the list of search results
 */

export default function Claim(props) {
  let cssClass = 'claim';
  if (props.isSelected) {
    cssClass = `${cssClass} claim--selected`;
  }

  if (typeof props.claim.labels !== 'undefined' && props.claim.labels.includes('Axiom')) {
    cssClass = `${cssClass} claim--axiom`;
  }

  return (
    <button className={cssClass} onClick={() => props.handleClick(props.claim)}>
      <div className="claim__body">
        <div className="claim__status-circle">
          <StatusIndicator state={props.claim.probability} type="circle" />
        </div>
        <div className="claim__text">
          {props.claim.text}
        </div>
      </div>
    </button>
  );
}

Claim.propTypes = {
  isSelected: React.PropTypes.bool,
  claim: React.PropTypes.shape({
    labels: React.PropTypes.arrayOf(React.PropTypes.string),
    text: React.PropTypes.string.isRequired,
    probability: React.PropTypes.number.isRequired,
  }).isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

Claim.defaultProps = {
  isSelected: false,
};
