import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/index";

class GoogleAuth extends Component {
  // state = { isSignedIn: null };

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
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          
          // when this library first boost up during initialisation, pass in user's current auth status
          this.onAuthChange(this.auth.isSignedIn.get()); // update redux store
          // to immediately update status without refreshing the page, pass in a callback function.
          this.auth.isSignedIn.listen(this.onAuthChange); // callback function is reference only
        });
    });
  }

  // callback should be arrow function
  onAuthChange = (isSignedIn) => {
    // need to dispatch some actions here to update redux store
    if (isSignedIn) {
      // pass in the Google ID when signing in
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // callback should be arrow function
  onSignInClick = () => {
    this.auth.signIn();
  };

  // callback should be arrow function
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
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

// communicate updated store back to component
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
