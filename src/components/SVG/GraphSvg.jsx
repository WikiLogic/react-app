import React from 'react';
import PropTypes from 'prop-types';
import GraphControls from '../GraphControls/GraphControls.jsx';

/**
 * The amazing pannable / zoomable SVG!
 * TODO: make the controls pretty & accessible
 */

export default class GraphSvg extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      topLeftX: -500,
      topLeftY: -500,
      width: 1000,
      height: 1000,
      panEnguaged: false,
      panOriginX: 0,
      panOriginY: 0,
      svgFocused: false
    };

    // this.svgRef;
    this.zoomHandler = this.zoomHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.svgFocusHandler = this.svgFocusHandler.bind(this);
    this.svgBlurHandler = this.svgBlurHandler.bind(this);
    this.wheelHandler = this.wheelHandler.bind(this);
    this.panHandler = this.panHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  onKeyDownHandler(e) {
    let killEvent = false;

    if (e.key === 'ArrowUp') { this.panHandler(0, 10); killEvent = true; }
    if (e.key === 'ArrowDown') { this.panHandler(0, -10); killEvent = true; }
    if (e.key === 'ArrowLeft') { this.panHandler(10, 0); killEvent = true; }
    if (e.key === 'ArrowRight') { this.panHandler(-10, 0); killEvent = true; }

    if (killEvent) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  svgFocusHandler() {
    this.setState({
      svgFocused: true
    });
  }
  svgBlurHandler() {
    this.setState({
      svgFocused: false
    });
  }

  zoomHandler(zoom, x, y) {
    //x y are the zoom point from the top left of the svg
    //how far is x along the width of the svg - use that as the ratio of the change
    const svgEl = this.svgRef.getBoundingClientRect();

    const xRatio = x / svgEl.width;
    const yRatio = y / svgEl.height;

    const newTopLeftX = this.state.topLeftX + (zoom * xRatio);
    const newTopLeftY = this.state.topLeftY + (zoom * yRatio);
    const newWidth = this.state.width - zoom;
    const newHeight = this.state.height - zoom;

    this.setState({
      topLeftX: newTopLeftX,
      topLeftY: newTopLeftY,
      width: newWidth,
      height: newHeight
    });
  }

  wheelHandler(e) {
    // console.log('clientX', e.clientX);
    //get svg offset
    // console.log('svgRef', this.svgRef.getBoundingClientRect());
    //client coords are distance from the top left point of the browser window (not includng scrollbars)

    if (this.state.svgFocused) {
      const svgOffset = this.svgRef.getBoundingClientRect();
      const xOffset = e.clientX - svgOffset.x;
      const yOffset = e.clientY - svgOffset.y;
      this.zoomHandler(-e.deltaY, xOffset, yOffset);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  panHandler(x, y) {
    const newTopLeftX = this.state.topLeftX + x;
    const newTopLeftY = this.state.topLeftY + y;
    this.setState({
      topLeftX: newTopLeftX,
      topLeftY: newTopLeftY
    });
  }

  mouseDownHandler(e) {
    this.setState({
      panEnguaged: true,
      panOriginX: e.screenX,
      panOriginY: e.screenY
    });
  }
  mouseUpHandler() {
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
      const newTopLeftX = this.state.topLeftX + (xDiff / 1);
      const newTopLeftY = this.state.topLeftY + (yDiff / 1);

      this.setState({
        topLeftX: newTopLeftX,
        topLeftY: newTopLeftY,
        panOriginX: e.screenX,
        panOriginY: e.screenY
      });
    }
  }

  render() {
    let panClass = '';
    if (this.state.panEnguaged) {
      panClass = 'graph-svg--panning';
    }
    return (
      <div className={`graph-svg ${panClass}`}>
        <div className="graph-svg__controls">
          <GraphControls
            panHandler={this.panHandler}
            zoomHandler={this.zoomHandler}
          />
        </div>
        <svg
          tabIndex="0"
          className="graph-svg__svg"
          ref={(el) => { this.svgRef = el; }}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox={`${this.state.topLeftX} ${this.state.topLeftY} ${this.state.width} ${this.state.height}`}
          onMouseMove={this.mouseMoveHandler}
          onMouseDown={this.mouseDownHandler}
          onMouseUp={this.mouseUpHandler}
          onWheel={this.wheelHandler}
          onKeyDown={this.onKeyDownHandler}
          onFocus={this.svgFocusHandler}
          onBlur={this.svgBlurHandler}
        >
          {this.props.children}
        </svg>
      </div>
    );
  }
}
