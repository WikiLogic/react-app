import React from 'react';
import { Link } from 'react-router-dom';

/* Each Claim in the list of search results
 */

export default class JobResult extends React.Component {

	constructor (props) {
		super(props)
		this.state = {};
	}

	render() {
		return (
			<Link to={`/claim/${this.props.search_result.id}`} className="search-result">
				<div className="search-result__body">
                    {this.props.search_result.body}
                </div>
                <div className="search-result__status-wrap">
                    <div className="search-result__status-bar search-result__status-bar--${status}"></div>
                </div>
			</Link>
		);
	}
}