import React from 'react';
import SearchInput from 'WlComponents/SearchInput/SearchInput.jsx';
import GraphControls from 'WlComponents/GraphControls/GraphControls.jsx';
import ClickerDragger from 'WlComponents/ClickerDragger/ClickerDragger.jsx';

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

    this.focus = this.focus.bind(this);
    this.zoomHandler = this.zoomHandler.bind(this);
    this.panHandler = this.panHandler.bind(this);
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

  // combined these guys into one (so we can move diagonally!)
  // panX(value) {
  //   console.log('I was triggered during render')
  //   const newTopLeftX = this.state.topLeftX + value;
  //   this.setState({
  //     topLeftX: newTopLeftX
  //   });
  // }

  // panY(value) {
  //   console.log('I was triggered during render')
  //   const newTopLeftY = this.state.topLeftY + value;
  //   this.setState({
  //     topLeftY: newTopLeftY
  //   });
  // }
  panHandler(x, y) {
    const newTopLeftX = this.state.topLeftX + x;
    const newTopLeftY = this.state.topLeftY + y;
    this.setState({
      topLeftX: newTopLeftX,
      topLeftY: newTopLeftY
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

          {/* Abstracted these guys into their own component so we're only dealing with moving the svg coords here */}
          {/* <div className="graph-controls">
            <button onClick={() => { this.panX(10); }}>-Pan</button>
            <button onClick={() => { this.panX(-10); }}>Pan-</button>
            <button onClick={() => { this.panY(10); }}>|Pan</button>
            <button onClick={() => { this.panY(-10); }}>Pan|</button>
            <button onClick={() => { this.zoom(10); }}>+</button>
            <button onClick={() => { this.zoom(-10); }}>-</button>
          </div> */}
          {/* Not putting this guy in the graph controls - I have a feeling that focus will be called from other places */}
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
          >

            <ClickerDragger x={0} y={0}>
              <polygon
                className="x"
                points="31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556 "
              />
            </ClickerDragger>

            <ClickerDragger x={0} y={100}>
              <circle cx={0} cy={0} r={10} fill="red" />
            </ClickerDragger>

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
