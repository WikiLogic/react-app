import React from "react";
import PropTypes from "prop-types";

/* Loader
 * the little dots that fly accross to indicate that something is loading
 */

export default class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    render() {
        let cssClass = "";
        if (this.props.isLoading) {
            cssClass = "loader--is-loading";
        }

        return (
            <div className={`loader ${cssClass}`}>
                <div className="loader__dot-wrapper loader__dot-wrapper--1">
                    <div className="loader__dot" />
                </div>
                <div className="loader__dot-wrapper loader__dot-wrapper--2">
                    <div className="loader__dot" />
                </div>
                <div className="loader__dot-wrapper loader__dot-wrapper--3">
                    <div className="loader__dot" />
                </div>
                <div className="loader__dot-wrapper loader__dot-wrapper--4">
                    <div className="loader__dot" />
                </div>
            </div>
        );
    }
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired
};
