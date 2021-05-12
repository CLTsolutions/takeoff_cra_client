import React, { Component } from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import BlogIndex from '../src/components/Blog/Views/BlogIndex'
import Footer from '../src/components/Site/Footer'
import Home from '../src/components/Site/Home'
import Sitebar from '../src/components/Site/Sitebar'
import { Redirect, Route, Switch } from 'react-router-dom'
import AdminView from '../src/components/Site/AdminView'

type valueTypes = {
  token: string
  userRole: string
}

class App extends Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props)
    this.state = {
      token: '',
      userRole: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('sessionToken')) {
      this.setState({
        token: localStorage.getItem('sessionToken')!, // ! is non-null assertion expression operator
      })
    }
    if (localStorage.getItem('userRole')) {
      this.setState({ userRole: localStorage.getItem('userRole')! }) // ! is non-null assertion expression operator
    }
  }

  updateIsAdmin = (newUserRole: string) => {
    localStorage.setItem('userRole', newUserRole)
    this.setState({ userRole: newUserRole })
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('sessionToken', newToken)
    // this.setState({ token: newToken, userRole: userRole })
    this.setState({ token: newToken })
  }

  // redirectNoToken = () => {
  //   if (this.state.token === '') {
  //     return <Redirect to='/' />
  //   }
  // }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '', userRole: '' })
  }

  protectedViewsAdmin = () => {
    return localStorage.getItem('userRole') === 'admin' ? (
      // display admin panel
      <AdminView token={this.state.token} />
    ) : (
      <Home token={this.state.token} />
    )
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('sessionToken') ? (
      <Home token={this.state.token} />
    ) : (
      <Auth updateToken={this.updateToken} updateIsAdmin={this.updateIsAdmin} />
    )
  }

  render() {
    return (
      <div className='App'>
        {/* {this.redirectNoToken()} */}
        {this.state.token && (
          <Sitebar
            logout={this.clearToken}
            token={this.state.token}
            userRole={this.state.userRole}
          />
        )}
        <Switch>
          <Route exact path='/'>
            {this.protectedViews}
          </Route>
          <Route exact path='/blog'>
            <BlogIndex token={this.state.token} />
          </Route>
          <Route exact path='/admin' component={AdminView}>
            {this.protectedViewsAdmin}
          </Route>
        </Switch>
        {/* <Footer>
          <Footer />
        </Footer> */}
      </div>
    )
  }
}

export default App
