import React from "react";
import PropTypes from "prop-types";

/* A status between 1 and 100
 */

export default function StatusIndicator(props) {
    if (props.type === "bar") {
        return (
            <div className="status-bar">
                <div className={`status-bar__bar status-bar__bar--${props.probability}`} />
            </div>
        );
    }

    if (props.type === "circle") {
        return (
            <div className={`status-circle status-circle--${props.probability}`}>
                <svg className="status-circle__svg" viewBox="-5 -5 200 200">
                    <circle
                        className="status-circle__svg-icon status-circle__svg-bg outer"
                        cx="95"
                        cy="95"
                        r="85"
                        transform="rotate(-90, 95, 95)"
                    />
                    <circle
                        className="status-circle__svg-icon status-circle__svg-state outer"
                        cx="95"
                        cy="95"
                        r="85"
                        transform="rotate(-90, 95, 95)"
                    />
                </svg>
                <div className="status-circle__text">{`${props.probability}%`}</div>
            </div>
        );
    }

    return null;
}

StatusIndicator.propTypes = {
    probability: PropTypes.number,
    type: PropTypes.string
};

StatusIndicator.defaultProps = {
    probability: 50,
    type: "circle"
};
