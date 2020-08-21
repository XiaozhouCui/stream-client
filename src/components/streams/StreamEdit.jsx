import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions/index';

class StreamEdit extends Component {
  componentDidMount() {
    // action will update state.streams
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    // before fetchStream() action is over, this.props.stream will be undefined, leading to crash
    if (!this.props.stream)
      return <div>Loading...</div>

    return (
      <div>
        {this.props.stream.title}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
