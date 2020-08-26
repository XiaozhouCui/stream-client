import React, { Component } from 'react';
import flv from 'flv.js';
import { fetchStream } from '../../actions/index';
import { connect } from 'react-redux';

class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    // stop streaming when navigated away
    this.player.destroy();
  }

  buildPlayer() {
    // don't build player if it is already built, or if there is no stream in props
    if (this.player || !this.props.stream) return;

    const { id } = this.props.match.params;
    // refer to flv.js documentation
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) return <div>Loading...</div>;

    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
