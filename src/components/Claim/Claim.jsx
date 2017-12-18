import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import StatusIndicator from 'WlComponents/StatusIndicator/StatusIndicator.jsx';

/* Each Claim in the list of search results
 */

@observer
class Claim extends React.Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }

  renderChildren() {
    const propChildrenMarkup = [];
    for (let c = 0; c < this.props.children.length; c++) {
      propChildrenMarkup.push(React.cloneElement(this.props.children[c], { claim: this.props.claim }));
    }
    return propChildrenMarkup;
  }

  render() {
    let cssClass = 'claim';

    //TODO: get this as proper data, labels is a hang over from neo
    if (typeof this.props.claim.labels !== 'undefined' && this.props.claim.labels.includes('Axiom')) {
      cssClass = `${cssClass} claim--axiom`;
    }
    return (
      <div className={cssClass}>
        <div className="claim__info">
          <div className="claim__status-circle">
            <StatusIndicator probability={this.props.claim.probability} type="circle" />
          </div>
          <Link to={`/claim/${this.props.claim._key}`} className="claim__text">
            {this.props.claim.text}
          </Link>
        </div>
        <div className="claim__prop-children">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Claim.propTypes = {
  claim: React.PropTypes.shape({
    labels: React.PropTypes.arrayOf(React.PropTypes.string),
    text: React.PropTypes.string.isRequired,
    probability: React.PropTypes.number,
    _key: React.PropTypes.string.isRequired,
    _id: React.PropTypes.string.isRequired
  }).isRequired,
  children: React.PropTypes.element
};

Claim.defaultProps = {
  probability: 0.5,
  children: null
};

export default Claim;
