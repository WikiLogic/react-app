import React from 'react';

/* A status between 1 and 100
 */

export default class StatusIndicator extends React.Component {

	constructor (props) {
		super(props)
	}

	render() {

		if (this.props.type == "bar") {
			return (
				<div className="status-bar">
					<div className={`status-bar__bar status-bar__bar--${this.props.state}`}></div>
				</div>
			);
		}
		if (this.props.type == "circle") {
			return (
				<div className="status-bar">
					<div className={`status-bar__bar status-bar__bar--${this.props.state}`}></div>
				</div>
			);
		}
		return null;
	}
}