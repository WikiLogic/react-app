import React from 'react';
import GraphControls from 'WlComponents/GraphControls/GraphControls.jsx';

/**
 * The amazing pannable / zoomable SVG!
 * TODO: make the controls pretty & accessible
 */
export default class GraphSvg extends React.Component {
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
      zoomEnguaged: false
    };

    this.focus = this.focus.bind(this);
    this.zoomHandler = this.zoomHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.wheelHandler = this.wheelHandler.bind(this);
    this.panHandler = this.panHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keyDown', this.onKeyDownHandler, false);
    document.addEventListener('keyUp', this.onKeyUpHandler, false);
  }


  componentWillUnmount() {
    document.removeEventListener('keyDown', this.onKeyDownHandler, false);
    document.removeEventListener('keyUp', this.onKeyUpHandler, false);
  }

  onKeyDownHandler(e) {
    console.log('key down', e.keyCode);
    if (e.keyCode === 16) {
      this.setState({
        zoomEnguaged: true
      });
    }
  }

  onKeyUpHandler(e) {
    if (e.keyCode === 16) {
      this.setState({
        zoomEnguaged: false
      });
    }
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

  focus(x, y) {
    this.setState({
      topLeftX: x,
      topLeftY: y,
    });
  }

  wheelHandler(e) {
    if (this.state.zoomEnguaged) {
      console.log('wheel', e.deltaY);
      this.zoomHandler(e.deltaY);
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
    return (
      <div className="graph-svg">
        <div className="graph-svg__controls">
          <GraphControls
            panHandler={this.panHandler}
            zoomHandler={this.zoomHandler}
          />
        </div>
        <svg
          className="graph-svg__svg"
          xmlns="http://www.w3.org/2000/svg"
          //xmlns:html="http://www.w3.org/1999/xhtml"
          version="1.1"
          viewBox={`${this.state.topLeftX} ${this.state.topLeftY} ${this.state.width} ${this.state.height}`}
          onMouseMove={this.mouseMoveHandler}
          onMouseDown={this.mouseDownHandler}
          onMouseUp={this.mouseUpHandler}
          onWheel={this.wheelHandler}
          onKeyDown={this.onKeyDownHandler}
          onKeyUp={this.onKeyUpHandler}
        >
          {this.props.children}
        </svg>
      </div>
    );
  }
}

GraphSvg.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]).isRequired
};
