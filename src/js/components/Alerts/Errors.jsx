import React from "react";
import PropTypes from "prop-types";
import AlertIcon from "src/components/_Icons/Alert.svg.jsx";

/**
 * Display error array
 * Usually those returned by the API
 */

export default class Argument extends React.Component {
    static propTypes = {
        errors: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const errorsMarkup = [];
        this.props.errors.forEach((err, i) => {
            const key = `${i}${err.title}`;
            errorsMarkup.push(
                <div className="alert" key={key}>
                    <div className="alert__icon">
                        <AlertIcon />
                    </div>
                    <div className="alert__body">
                        <div className="alert__title">{err.title}</div>
                        {err.message && <div className="alert__message">{err.message}</div>}
                    </div>
                </div>
            );
        });

        return <div className="alerts">{errorsMarkup}</div>;
    }
}
