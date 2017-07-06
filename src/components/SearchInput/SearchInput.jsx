import React from 'react';
import SearchIcon from  '../_Icons/SearchIcon.jsx';

/* Listens to the search form for input and submission
 * Publishes search submissions (for text or number searches)
 * Hands the submission event back up to the parent
 */

export default class SearchInput extends React.Component {

	constructor (props) {
		super(props);
		this.state = {value: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.inputValue != '') {
			this.setState({
				value: nextProps.inputValue
			});
		}
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.submissionHandler(this.state.value);
	}

	render() {
		return (
			<form className="search-form" onSubmit={this.handleSubmit}>
				<input className="search-form__input" type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange}/>
				<button className="search-form__submit" onClick={this.handleSubmit}>
					<SearchIcon/>
				</button>
			</form>
		);
	}
}