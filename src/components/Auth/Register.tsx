import React, { Component } from 'react'
import APIURL from '../helpers/environment'

type acceptedProps = {
  // updateToken: (newToken: string) => void
  updateToken: any
}

interface RegisterState {
  firstName: string
  lastName: string
  email: string
  password: string
  userRole: string
}

export default class Register extends Component<acceptedProps, RegisterState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userRole: '',
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch(`${APIURL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        this.props.updateToken(data.sessionToken, this.state.userRole)
      })
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({ [name]: value } as Pick<RegisterState, keyof RegisterState>)
  }

  render() {
    return (
      <div className='register'>
        <form onSubmit={this.handleSubmit} className='space-y-5'>
          <div className='flex flex-col'>
            <label htmlFor='firstName'>
              <input
                id='firstName'
                className='w-full border-2 border-transparent
                p-2 rounded outline-none focus:border-purple-500'
                required
                type='text'
                placeholder='First Name'
                value={this.state.firstName}
                name='firstName'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='lastName'>
              <input
                id='lastName'
                className='w-full border-2 border-transparent
                p-2 rounded outline-none focus:border-purple-500'
                required
                type='text'
                placeholder='Last Name'
                value={this.state.lastName}
                name='lastName'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>
              <input
                id='email'
                required
                type='email'
                className='w-full border-2 border-transparent
               p-2 rounded outline-none focus:border-purple-500'
                placeholder='Email'
                value={this.state.email}
                name='email'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>
              <input
                id='password'
                className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                required
                type='password'
                placeholder='Password'
                minLength={8}
                value={this.state.password}
                name='password'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <button
            type='submit'
            className='py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mb-3'
          >
            Register
          </button>
        </form>
      </div>
    )
  }
}
