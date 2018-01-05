import React from 'react';
import PropTypes from 'prop-types';

/* Loader
 * the little dots that fly accross to indicate that something is loading
 */

export default class Loader extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {

    // let cssClass = '';
    // if (this.props.isLoading) {
    //   cssClass = 'loader--is-loading';
    // }

    return (
      <button className="LoadingButton" type={this.props.type} onClick={this.props.onClick}>
        {this.props.value}
        <div className="LoadingButton__loader">
          <div className="LoadingButton__loader-dot" />
          <div className="LoadingButton__loader-dot" />
          <div className="LoadingButton__loader-dot" />
          <div className="LoadingButton__loader-dot" />
        </div>
      </button>
    );
  }
}
