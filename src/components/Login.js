import React, { Component } from 'react';

class Login extends Component {
  handleSubmit (event) {
    event.preventDefault()
    console.log(event)
  }
  render () {
    return <div id="login-container">
        <form id="login-box">
          <p id="login-title">Iniciar sesion</p>
          <input type="text" id="login-mail" placeholder="Usuario" required />
          <input type="password" id="login-password" placeholder="Contrasena" required />
          <input type="submit" id="login-submit" value="Entrar" onClick={this.handleSubmit} />
        </form>
      </div>;
  }
}

export default Login