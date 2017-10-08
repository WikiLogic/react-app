import React from 'react';
import SearchInput from 'WlComponents/SearchInput/SearchInput.jsx';
import GraphControls from 'WlComponents/GraphControls/GraphControls.jsx';
import DougArg from 'WlComponents/DougArg/DougArg.jsx';
import DougClaim from 'WlComponents/DougClaim/DougClaim.jsx';

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
      height: 100,
      panEnguaged: false,
      panOriginX: 0,
      panOriginY: 0,
      numberOfArgsInGroup: 2,
      claimSize: 20,
      claimText: 'change'
    };

    this.focus = this.focus.bind(this);
    this.zoomHandler = this.zoomHandler.bind(this);
    this.panHandler = this.panHandler.bind(this);
    this.svgMouseDownHandler = this.svgMouseDownHandler.bind(this);
    this.svgMouseUpHandler = this.svgMouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  focus(x, y) {
    this.setState({
      topLeftX: x,
      topLeftY: y,
    });
  }

  zoomHandler(value) {
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

  panHandler(x, y) {
    const newTopLeftX = this.state.topLeftX + x;
    const newTopLeftY = this.state.topLeftY + y;
    this.setState({
      topLeftX: newTopLeftX,
      topLeftY: newTopLeftY
    });
  }

  svgMouseDownHandler(e) {
    this.setState({
      panEnguaged: true,
      panOriginX: e.screenX,
      panOriginY: e.screenY
    });
  }

  svgMouseUpHandler() {
    this.setState({
      panEnguaged: false,
      panOriginX: 0,
      panOriginY: 0
    });
  }

  mouseMoveHandler(e) {
    if (this.state.panEnguaged) {
      //get the difference between panOrigin and e, apply to coords, reset panOrigin
      const xDiff = this.state.panOriginX - e.screenX;
      const yDiff = this.state.panOriginY - e.screenY;

      //modify the distance - TODO: base this on zoom
      const newTopLeftX = this.state.topLeftX + (xDiff / 10);
      const newTopLeftY = this.state.topLeftY + (yDiff / 10);

      this.setState({
        topLeftX: newTopLeftX,
        topLeftY: newTopLeftY,
        panOriginX: e.screenX,
        panOriginY: e.screenY
      });
    }
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

          <button onClick={() => { this.focus(0, 80); }}>Ja-pan</button>
          <GraphControls
            panHandler={this.panHandler}
            zoomHandler={this.zoomHandler}
          />

          <svg
            className="graph-svg"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={`${this.state.topLeftX} ${this.state.topLeftY} ${this.state.width} ${this.state.height}`}
            onMouseMove={this.mouseMoveHandler}
            onMouseDown={this.svgMouseDownHandler}
            onMouseUp={this.svgMouseUpHandler}
          >

            <DougClaim x={-40} y={-50} claimSize={`${this.state.claimSize}`} claimText="OriginalClaim" />

            <DougArg x={30} y={30} claimSize={`${this.state.claimSize}`} claimText="nope" />

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
