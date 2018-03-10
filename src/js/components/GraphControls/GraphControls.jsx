import React from "react";
import PropTypes from "prop-types";

/**
 * Controlling our position on the graph!
 * Or at least handing up responsibility for controlling it back up to the graph, but handling the ui / interaction events
 */

export default class GraphControls extends React.Component {
    constructor(props) {
        super(props);
        this.panHandler = this.panHandler.bind(this);
        this.zoomHandler = this.zoomHandler.bind(this);
    }

    panHandler(x, y) {
        this.props.panHandler(x, y);
    }

    zoomHandler(zoom) {
        this.props.zoomHandler(zoom);
    }

    render() {
        return (
            <div className="graph-controls">
                {/*  
          <button onClick={() => { this.panHandler(-10, 0); }}>🡸Pan</button>
          <button onClick={() => { this.panHandler(10, 0); }}>Pan🡺</button>
          <button onClick={() => { this.panHandler(0, -10); }}>🡹Pan🡹</button>
          <button onClick={() => { this.panHandler(0, 10); }}>🡻Pan🡻</button>
        */}
                <button
                    onClick={() => {
                        this.zoomHandler(10);
                    }}
                >
                    +
                </button>
                <button
                    onClick={() => {
                        this.zoomHandler(-10);
                    }}
                >
                    -
                </button>
            </div>
        );
    }
}

GraphControls.propTypes = {
    panHandler: PropTypes.func.isRequired,
    zoomHandler: PropTypes.func.isRequired
};
