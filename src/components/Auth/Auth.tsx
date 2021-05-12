import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import './Auth.css'
import { Link } from 'react-router-dom'

type acceptedProps = {
  updateToken: (newToken: string) => void
  updateIsAdmin: (newUserRole: string) => void
}

interface AuthState {
  login: boolean
  setLogin: boolean
  firstName: string
  lastName: string
  email: string
  password: string
}

export default class Auth extends Component<acceptedProps, AuthState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      login: true,
      setLogin: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  authTernary = () => {
    return this.state.login ? (
      <Login
        updateToken={this.props.updateToken}
        updateIsAdmin={this.props.updateIsAdmin}
      />
    ) : (
      <Register updateToken={this.props.updateToken} />
    )
  }

  loginToggle = () => {
    this.setState({
      login: !this.state.login,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
  }

  render() {
    return (
      <div className='map-img'>
        <div className='grid grid-cols-5 grid-rows-3 justify-center'>
          <h1 className='app-header text-6xl col-start-1 col-end-2 row-start-2 justify-self-center'>
            Takeoff...
          </h1>
          <h4 className='app-subtitle row-start-3 row-end-4 col-span-2 justify-self-center self-center'>
            leave the world behind but not your memories.
          </h4>
        </div>
        <div className='bg-indigo-400 bg-opacity-75 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl w-1/2 text-center'>
          {this.authTernary()}
          {this.state.login ? (
            <Link to='' className='auth-link' onClick={this.loginToggle}>
              Or register now!
            </Link>
          ) : (
            <Link to='' className='auth-link' onClick={this.loginToggle}>
              Login Now!
            </Link>
          )}
        </div>
      </div>
    )
  }
}
