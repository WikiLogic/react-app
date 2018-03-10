import React from "react";
import PropTypes from "prop-types";

/**
 * The Legal documents
 *
 * @prop {*} name
 */
export default function LegalScene(props) {
    let legalBlurb = "legal blurb";
    let title = "Title";
    if (props.page === "privacy-policy") {
        title = "Privacy Policy";
        legalBlurb = "The policy...";
    }

    if (props.page === "terms-and-conditions") {
        title = "Terms and conditions";
        legalBlurb = "The policy...";
    }

    return (
        <div className="page">
            <div className="page__header">
                <div className="max-width-wrap">{title}</div>
            </div>
            <div className="page__body">
                <div className="max-width-wrap">
                    <div className="layout-cols-2">
                        <div className="layout-cols-2__left">{legalBlurb}</div>
                        <div className="layout-cols-2__right">Easy readable version</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

LegalScene.propTypes = {
    page: PropTypes.string.isRequired
};
