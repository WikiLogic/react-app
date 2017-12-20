import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import SearchIcon from 'WlComponents/_Icons/SearchIcon.svg.jsx';

/* Listens to the search form for input and submission
 * Publishes search submissions (for text or number searches)
 * Hands the submission event back up to the parent
 */

@observer
export default class SearchForm extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  @action
  handleChange(event) {
    this.props.store.term = event.target.value;
  }

  @action
  handleSubmit(event) {
    event.preventDefault();
    this.props.store.submit();
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        {(this.props.label &&
          <label
            htmlFor={this.props.id}
            className="search-form__label"
          >
            {this.props.label}
          </label>
        )}

        <input
          id={this.props.id}
          className="search-form__input"
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.store.term}
          onChange={this.handleChange}
        />

        <button className="search-form__submit" onClick={this.handleSubmit}>
          <SearchIcon />
        </button>
      </form>
    );
  }
}
