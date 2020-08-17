import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

const PageOne = () => {
  return <div>PageOne</div>;
};

const PageTwo = () => {
  return (
    <div>
      PageTwo
      <button>Click Me!</button>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={PageOne} />
      <Route path="/pagetwo" component={PageTwo} />
    </BrowserRouter>
  );
};

export default App;
