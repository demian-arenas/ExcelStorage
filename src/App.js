import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Docs from "./components/Docs";
class App extends Component {
  render() {
    return <div>
        <Route exact path={"/"} component={Login} />
        <Route path={"/docs"} component={Docs} />
      </div>;
  }
}

export default App;
