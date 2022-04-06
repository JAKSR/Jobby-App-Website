import React from 'react'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderSuccessView = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  renderFailureView = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-div">
        <form className="form-div" onSubmit={this.onSubmitForm}>
          <div className="form-logo-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="form-logo"
            />
          </div>
          <div className="inputs-div">
            <label htmlFor="name" className="label">
              USERNAME
            </label>
            <input
              id="name"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
              className="input"
            />
          </div>
          <div className="inputs-div">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
              className="input"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
