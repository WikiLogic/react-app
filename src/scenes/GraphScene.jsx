import React from 'react';
import SearchInput from 'WlComponents/SearchInput/SearchInput.jsx';

/**
 * The Home page
 * @prop {*} name 
 */
export default class GraphScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_results: [],
      topLeftX: -50,
      topLeftY: -50,
      width: 100,
      height: 100
    };

    this.pan = this.pan.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  pan() {

  }

  zoom(value) {
    const newTopLeftX = this.state.topLeftX + value;
    const newTopLeftY = this.state.topLeftY + value;
    const newWidth = this.state.width - (value * 2);
    const newHeight = this.state.height - (value * 2);
    this.setState({
      topLeftX: newTopLeftX,
      topLeftY: newTopLeftY,
      width: newWidth,
      height: newHeight
    });
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <SearchInput
              id="home-scene-search-input"
              label="Search"
              submissionHandler={this.searchClaims}
              placeholder="Search Claims"
            />

          </div>
        </div>
        <div className="page__body page__body--graph">
          <div className="graph-controls">
            <button onClick={() => { this.zoom(10); }}>+</button>
            <button onClick={() => { this.zoom(-10); }}>-</button>
          </div>
          <svg
            className="graph-svg"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={`${this.state.topLeftX} ${this.state.topLeftY} ${this.state.width} ${this.state.height}`}
          >
            <polygon
              className="x"
              points="31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556 "
            />
          </svg>
        </div>
      </div>
    );
  }
}

GraphScene.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};
