import React from 'react';

/* Each Claim in the list of search results
 */

export default class SearchResult extends React.Component {

	constructor (props) {
		super(props)
		this.state = {};
	}

	render() {
        let status = Math.floor((Math.random() * 100) + 1);

		return (
			<div className="search-result" onClick={() => this.props.handleClick(this.props.search_result)}>
				<div className="search-result__body">
                    {this.props.search_result.body}
                </div>
                <div className="search-result__status-wrap">
                    <div className={`search-result__status-bar search-result__status-bar--${status}`}></div>
                </div>
			</div>
		);
	}
}