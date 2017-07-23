import React from 'react';
import { Link } from 'react-router-dom';
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
  // onClick={() => props.handleClick(props.claim)}
  return (
    <div className={cssClass}>
      <div className="claim__body">
        <div className="claim__status-circle">
          <StatusIndicator state={props.claim.probability} type="circle" />
        </div>
        <Link to={`/claim/${props.claim.id}`} className="claim__text">
          {props.claim.text}
        </Link>
      </div>
    </div>
  );
}

Claim.propTypes = {
  isSelected: React.PropTypes.bool,
  claim: React.PropTypes.shape({
    labels: React.PropTypes.arrayOf(React.PropTypes.string),
    text: React.PropTypes.string.isRequired,
    probability: React.PropTypes.number,
    id: React.PropTypes.number.isRequired,
  }).isRequired,
};

Claim.defaultProps = {
  isSelected: false,
  probability: 0.5,
};
