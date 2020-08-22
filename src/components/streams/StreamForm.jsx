import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    // formProps is automatically filled by redux-form
    // conditional semantic-ui classes for input field error highlight
    const className = `field ${formProps.meta.error && formProps.meta.touched ? "error" : ""}`; 
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input
          type="text"
          autoComplete="off"
          // onChange={formProps.input.onChange} // binding change to redux store
          // value={formProps.input.value} // making it a controlled input element by redux store
          {...formProps.input} // load all input properties (onChange, onBlur...) from redux-form
        />
        {this.renderError(formProps.meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    // event.preventDefault(); // redux-form did this automatically
    // console.log(formValues); // {title: "asdf", description: "qwer"}
    this.props.onSubmit(formValues);
  }

  render() {
    // this.props is automatically filled by redux-form
    // console.log(this.props);
    // this.onSubmit callback will be wrapped in a redux-form callback (this.props.handleSubmit)
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// validation: redux-form will pass errors.title to <Field name="title" /> as formProps.meta.error
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "you must enter a title";
  }

  if (!formValues.description) {
    errors.description = "you must enter a description";
  }

  return errors;
}

// hook up redux-form
// all Fields in this component will be added to store (state.form.streamCreate)
export default reduxForm({
  form: "streamForm",
  validate: validate, // add validate function to state.validate
})(StreamForm);

