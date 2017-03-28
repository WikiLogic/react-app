import React from 'react';
import StatusBar from '../StatusBar/StatusBar.jsx';

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
			<div className="search-result" onClick={() => this.props.handleClick(this.props.claim)}>
				<div className="search-result__body">
                    {this.props.claim.body}
                </div>
                <StatusBar state={this.props.claim.state}/>
			</div>
		);
	}
}