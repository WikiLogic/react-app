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
      numberOfArgsInGroup: 2,
      claimSize: 20,
      claimText: 'change'

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
       
            <DougClaim x={-40} y={-50} claimSize={`${this.state.claimSize}`} claimText="OriginalClaim" />

            <DougArg x={30} y={30} claimSize={`${this.state.claimSize}`} claimText={"nope"} />
        
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
