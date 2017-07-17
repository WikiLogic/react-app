import React from 'react';

/* A status between 1 and 100
 */

export default class StatusIndicator extends React.Component {

	constructor(props) {
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
				<div className={`status-circle status-circle--${(this.props.state * 100)}`}>
					<svg className="status-circle__svg" viewBox="-5 -5 200 200">
						<circle className="status-circle__svg-icon status-circle__svg-bg outer" cx="95" cy="95" r="85" transform="rotate(-90, 95, 95)" />
						<circle className="status-circle__svg-icon status-circle__svg-state outer" cx="95" cy="95" r="85" transform="rotate(-90, 95, 95)" />
					</svg>
					<div className="status-circle__text">
						{(this.props.state * 100) + "%"}
					</div>
				</div>
			);
		}
		return null;
	}
}