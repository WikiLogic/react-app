import React from 'react';

/* A status between 1 and 100
 */

export default class StatusBar extends React.Component {

	constructor (props) {
		super(props)
	}

	render() {
		return (
            <div className="status-bar">
                <div className={`status-bar__bar status-bar__bar--${this.props.state}`}></div>
            </div>
		);
	}
}