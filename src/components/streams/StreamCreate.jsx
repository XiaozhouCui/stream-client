import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends Component {
  renderInput(formProps) {
    // formProps is automatically filled by redux-form
    return (
      <div className="field">
        <label>{formProps.label}</label>
        <input
          // type="text"
          // onChange={formProps.input.onChange}
          // value={formProps.input.value} // making it a controlled form input element
          {...formProps.input}
        />
      </div>
    );
  }

  render() {
    // console.log(this.props)
    return (
      <form className="ui form">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
      </form>
    );
  }
}

// hook up redux-form
// all Fields in this component will be added to store (state.form.streamCreate)
export default reduxForm({
  form: "streamCreate",
})(StreamCreate);
