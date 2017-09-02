import React from 'react';

/* Loader
 * the little dots that fly accross to indicate that something is loading
 */

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {

    let cssClass = '';
    if (this.props.isLoading) {
      cssClass = 'loader--is-loading';
    }

    return (
      <div className={`loader ${cssClass}`}>
        <div className="loader__dot loader__dot--1" />
        <div className="loader__dot loader__dot--2" />
        <div className="loader__dot loader__dot--3" />
        <div className="loader__dot loader__dot--4" />
      </div>
    );
  }
}

Loader.propTypes = {
  isLoading: React.PropTypes.bool.isRequired
};
