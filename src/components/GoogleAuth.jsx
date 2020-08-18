import React, { Component } from "react";

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    // first need to load gapi library "https://apis.google.com/js/api.js" in index.html
    // then "gapi.auth2.getAuthInstance()" can be called in console to return "auth" object
    // load additional module "client:auth2", and pass in a callback function
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          // init() will return a promise
          clientId: "462903335105-17fk24h1isnc732s6m1jcl6a025hfm9c.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // save gapi auth instance to this class component
          this.auth = window.gapi.auth2.getAuthInstance();
          // update the state to show login status when page is refreshed
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          // to immediately update status without refreshing the page, pass in a callback func.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // callback should be arrow function
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  // callback should be arrow function
  onSignIn = () => {
    this.auth.signIn();
  };

  // callback should be arrow function
  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui blue google button">
          <i className="google icon" />
          Signin with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
