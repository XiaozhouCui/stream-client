import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions/index";
import { connect } from "react-redux";

function StreamDelete(props) {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const actions = (
    <Fragment>
      <button onClick={() => props.deleteStream(props.match.params.id)} className="ui button negative">Delete</button>
      <Link to="/" className="ui button">Cancel</Link>
    </Fragment>
  )

  const renderContent = () => {
    if (!props.stream)
      return "Are you sure you want to delete this stream?"
    return `Are you sure you want to delete thie stream with title ${props.stream.title}?`
  }

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push("/")}
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);