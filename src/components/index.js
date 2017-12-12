import React, { Component } from 'react'
import './index.css';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Dashboard from './protected/Dashboard'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : <BrowserRouter>
        <div>
          <div id="navBar">
            <Link id="navBarLink" to="/dashboard">
              Dashboard
            </Link>
            {this.state.authed ? <button id="navBarLogout" onClick={() => {
                  logout();
                }}>
                Logout
              </button> :
              <Link id="navBarLink"  to="/">
                Login
              </Link>
              }
          </div>
          <Switch>
            <PublicRoute authed={this.state.authed} exact path="/" component={Login} />
            <PrivateRoute authed={this.state.authed} path="/dashboard" component={Dashboard} />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>
      </BrowserRouter>;
  }
}
