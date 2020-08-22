import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions/index';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {
  componentDidMount() {
    // action will update state.streams
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    // formValues will be the "initialValues" props we passed to <StreamForm />
    // console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    // before fetchStream() action is over, this.props.stream will be undefined, leading to crash
    if (!this.props.stream)
      return <div>Loading...</div>

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          initialValues={_.pick(this.props.stream, 'title', 'description')} // "initialValues" is a special props for redux-form
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
