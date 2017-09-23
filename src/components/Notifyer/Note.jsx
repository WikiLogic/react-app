import React from 'react';


export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 0
    };
  }

  componentWillMount() {
    const timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>{this.props.title}</div>
    );
  }
}

Note.propTypes = {
  title: React.PropTypes.string.isRequired,
};
