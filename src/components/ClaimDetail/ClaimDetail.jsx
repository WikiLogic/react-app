import React from 'react';
import api from '../../API/api.js';
import Argument from '../Argument/Argument.jsx';
import StatusBar from '../StatusBar/StatusBar.jsx';

/* A claim
 * and all it's arguments
 * Also the options to add arguments - eventually
 */

export default class ClaimDetail extends React.Component {

	constructor (props) {
		super(props);
        this.state = {
            highlight_premis_id: ""
        };
        this.premisClickHandler = this.premisClickHandler.bind(this);
	}

    //When this claim chain recieves new props that means there's a new focus argument. So this clears out the state
    componentWillReceiveProps(){
        this.setState({
            highlight_premis_id: ""
        });
    }

    //the focus premises get their own click handler as the logic is a bit different
    premisClickHandler(premis){
        console.log("Claim detail: premis click");
        this.props.premisClickHandler(premis);
    }

	render() {
        if (typeof this.props.claim.text == 'undefined') { return null; }
        let argumentMarkup = null;
        //the arguments
        if (this.props.claim.arguments.length > 0) {
            argumentMarkup = this.props.claim.arguments.map(function(argumentObject, index){
                return <Argument argumentObject={argumentObject} key={index} highlightedPremisId={this.props.highlightedPremisId} premisClickHandler={this.premisClickHandler} />
            }.bind(this));
        } else {
			argumentMarkup = <div>No arguments - <a href="http://www.wikilogicfoundation.org/get-involved/" target="_blank">sign up</a> to add your own!</div>;
		}

		return (
			<div className="claim-detail">
                <div className="claim-detail__header">
                    <div className="claim-detail__text">
                        {this.props.claim.text}
                    </div>
                    <div className="claim-detail__status">   
                        <StatusBar state={this.props.claim.state}/>
                    </div>
                </div>

                <div className="claim-detail__arguments">
                    {argumentMarkup}
                </div>

			</div>
		);
	}
}