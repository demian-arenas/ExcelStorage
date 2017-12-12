import React, { Component } from 'react'
import { login } from '../helpers/auth'
import './Login.css'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  render () {
    return <div id="login">
        <div id='loginBox'>
          <h1 id="loginTitle"> Login </h1>
          <form id='loginForm' onSubmit={this.handleSubmit}>
            <div id='loginGroup'>
              <label>Email</label>
              <input id="loginInput" ref={email => (this.email = email)} placeholder="Email" />
            </div>
            <div id='loginGroup'>
              <label>Password</label>
              <input type="password" id="loginInput" placeholder="Password" ref={pw => (this.pw = pw)} />
            </div>
            <button type="submit" id='loginSubmit'>Login</button>
          </form>
        </div>
      </div>;
  }
}
