import React, { Component } from 'react'
import { Table } from 'reactstrap'
import APIURL from '../helpers/environment'

type acceptedProps = {
  token: string
}

interface AdminViewState {
  users: []
}
export class AdminView extends Component<acceptedProps, AdminViewState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      users: [],
    }
  }

  private _fetchUsers = async () => {
    if (this.props.token) {
      try {
        const response = await fetch(`${APIURL}/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
          },
        })
        const data = await response.json()
        this.setState({ users: data })
        return data
      } catch (err) {
        console.log(err)
      }
    }
  }
  public get fetchUsers() {
    return this._fetchUsers
  }
  public set fetchUsers(value) {
    this._fetchUsers = value
  }

  componentDidMount() {
    this.fetchUsers()
  }

  // added because token isn't being passed before fetch is called
  // calling fetch again until token passes
  componentDidUpdate(prev: acceptedProps) {
    if (prev.token !== this.props.token) {
      this.fetchUsers()
    }
  }

  deleteUser = async (e: any, id: number) => {
    e.preventDefault()
    await fetch(`${APIURL}/user/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
    return this.fetchUsers() // updating flight list after one is deleted
  }

  mappingUsers = () => {
    if (this.state.users) {
      return this.state.users.map((user: any, index: number) => {
        return (
          <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.userRole}</td>
            <td>
              {user.userRole === 'User' ? (
                <button
                  type='submit'
                  className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mb-3'
                  onClick={e => this.deleteUser(e, user.id)}
                >
                  Delete
                </button>
              ) : (
                <></>
              )}
            </td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <h3 className='text-center mb-3'>Users:</h3>
        <Table striped>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>{this.state.users ? this.mappingUsers() : null}</tbody>
        </Table>
      </div>
    )
  }
}

export default AdminView
