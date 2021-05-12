import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  NavbarBrand,
} from 'reactstrap'
import Logo from '../../assets/airplane.svg'

type acceptedProps = {
  token: string
  logout: () => void // from app.tsx
  userRole: string | null
}

type valueTypes = {
  isOpen: boolean
}
export default class Sitebar extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  logoutButton = () => {
    return localStorage.getItem('sessionToken') === null ? (
      ''
    ) : (
      <Link to='/'>
        <button onClick={this.props.logout}>Logout</button>
      </Link>
    )
  }

  adminLinkInNavbar = () => {
    return this.props.userRole === 'admin' ? (
      <button>Admin Panel</button>
    ) : (
      // ''
      <></>
    )
  }

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand>
            <Link to='/'>
              <img src={Logo} alt='logo' height='32px' width='32px' />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink>
                  <Link to='/' className='text-muted'>
                    Home
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/blog' className='text-muted'>
                    Blog
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/admin' className='text-muted'>
                    {this.adminLinkInNavbar()}
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>{this.logoutButton()}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
