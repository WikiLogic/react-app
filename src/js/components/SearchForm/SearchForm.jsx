import React from "react";
import PropTypes from "prop-types";
import { action } from "mobx";
import { observer } from "mobx-react";
import InputButton from "src/components/_Atoms/InputButton.jsx";
// import SearchIcon from '../_Icons/SearchIcon.svg.jsx';

@observer
export default class SearchForm extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        placeholder: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.handleTermSubmit = this.handleTermSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    @action
    handleTermSubmit() {
        this.props.store.submit();
    }

    @action
    handleSubmit(event) {
        event.preventDefault();
        this.props.store.submit();
    }

    render() {
        return (
            <form className="SearchForm" onSubmit={this.handleSubmit}>
                <InputButton
                    id={this.props.id}
                    inputType="text"
                    inputPlaceholder={this.props.placeholder}
                    value={this.props.store.term}
                    btnText="Search"
                    changeHandler={term => {
                        this.props.store.term = term;
                    }}
                    submitHandler={this.handleTermSubmit}
                />
            </form>
        );
    }
}
