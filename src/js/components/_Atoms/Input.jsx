import React from "react";
import PropTypes from "prop-types";

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        let setInputValue = "";
        if (Object.prototype.hasOwnProperty.call(props, "inputInitValue")) {
            setInputValue = props.inputInitValue;
        } else {
            setInputValue = "";
        }

        this.state = {
            value: setInputValue
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({
            value: e.target.value
        });

        if (Object.prototype.hasOwnProperty.call(this.props, "inputChangeHandler")) {
            this.props.inputChangeHandler(e.target.value);
        }
    }

    render() {
        return (
            <div className="Input">
                <label htmlFor={this.props.id}>{this.props.labelText}</label>

                <input
                    id={this.props.id}
                    type={this.props.inputType}
                    placeholder={this.props.inputPlaceholder}
                    value={this.state.value}
                    onChange={this.changeHandler}
                    onKeyPress={e => {
                        if (e.key === "Enter") {
                            this.props.submitHandler(this.state.value);
                        }
                    }}
                />
            </div>
        );
    }
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    inputPlaceholder: PropTypes.string.isRequired,
    inputInitValue: PropTypes.string,
    inputChangeHandler: PropTypes.func,
    submitHandler: PropTypes.func.isRequired
};

Input.defaultProps = {
    inputChangeHandler: () => {},
    inputInitValue: ""
};
