import React, { Component } from 'react';

class GoogleAuth extends Component {
  componentDidMount() {
    // first need to load "https://apis.google.com/js/api.js" in index.html
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId: "462903335105-17fk24h1isnc732s6m1jcl6a025hfm9c.apps.googleusercontent.com",
        scope: "email"
      });
    });
  }

  render() {
    return (
      <div>
        Google Auth
      </div>
    );
  }
}

export default GoogleAuth;