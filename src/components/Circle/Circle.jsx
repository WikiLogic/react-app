import React from 'react';
import StatusIndicator from 'Components/StatusIndicator/StatusIndicator.jsx';
import Claim from 'Components/Claim/Claim.jsx';

/* A claim
 * and all it's arguments
 * Also the options to add arguments - eventually
 */

export default class Circle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(premis) {
        this.props.premisClickHandler(premis);
    }

    render() {

        //loop through the premises in this argument
        let premises = this.props.argumentObject.premises.map(function (premis, index) {

            let isSelected = (premis.id == this.props.highlightedPremisId);

            return (
                <div className="argumentCircle__premis" key={index}>
                    <Claim claim={premis} isSelected={isSelected} handleClick={() => { this.handleClick(premis); }} />
                </div>
            );
        }.bind(this));

        let colour = this.props.argumentObject.probability < 50 ? "false" :"true" ;
        console.log("colour", colour);
        return (
            <div className={`argument argumentCircle--${colour}`}>
                {/*<div className="argumentCircle__header">
                    {this.props.argumentObject.type}
                </div>*/}
                <div className="argumentCircle__body">
                    {premises}
                </div>
            </div>
        );
    }
}