import React from "react";
import PropTypes from "prop-types";

/**
 * |Input|Button|
 */

export default class InputButton extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        labelText: PropTypes.string,
        inputType: PropTypes.string.isRequired,
        inputPlaceholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        btnText: PropTypes.string.isRequired,
        submitHandler: PropTypes.func.isRequired,
        changeHandler: PropTypes.func.isRequired
    };

    static defaultProps = {
        labelText: null,
        inputInitValue: ""
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="InputButton">
                {this.props.labelText && (
                    <label htmlFor={this.props.id}>{this.props.labelText}</label>
                )}

                <div className="InputButton__input">
                    <input
                        id={this.props.id}
                        type={this.props.inputType}
                        placeholder={this.props.inputPlaceholder}
                        value={this.props.value}
                        onChange={e => {
                            this.props.changeHandler(e.target.value);
                        }}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                this.props.submitHandler(this.props.value);
                            }
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            this.props.submitHandler(this.props.value);
                        }}
                    >
                        {this.props.btnText}
                    </button>
                </div>
            </div>
        );
    }
}
