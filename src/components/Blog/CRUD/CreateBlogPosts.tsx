import React, { Component } from 'react'
import APIURL from '../../helpers/environment'

type acceptedProps = {
  token: any
  fetchBlog: () => void
}

export interface CreateBlogPostsState {
  // blog: []
  blog: Array<object>
  date: string
  title: string
  entry: string
}

//prettier-ignore
export class CreateBlogPosts extends Component<acceptedProps, CreateBlogPostsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      blog: [],
      date: '',
      title: '',
      entry: '',
    }
  }

  newBlog = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const response = await fetch(`${APIURL}/blog`, {
        method: 'POST',
        body: JSON.stringify({
          date: this.state.date,
          title: this.state.title,
          entry: this.state.entry,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        }),
      })
      const data = await response.json()
      // resets input fields after submit
      this.setState({
        date: '',
        title: '',
        entry: '',
      })
      // calling blog library again after creating new flight
      this.props.fetchBlog()
    } catch (err) {
      console.log(err)
    }
  }

  //handles input fields onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.value
    const name = target.name
    //prettier-ignore
    this.setState(({ [name]: value } as unknown) as Pick<CreateBlogPostsState, keyof CreateBlogPostsState>)
  }

  render() {
    return (
      <div className='bg-indigo-500 bg-opacity-60 max-w-2xl mx-auto p-5 md:p-12 rounded-lg shadow-2xl w-1/2 my-6'>
        <h3 className='mb-4 text-center text-indigo-900'>Write a new blog post.</h3>
        <form className='space-y-3' onSubmit={this.newBlog}>
          <div className='flex flex-col text-center'>
            <label htmlFor='title'>
              <input
                id='title'
                type='text'
                className='w-full border-2 border-transparent
                p-2 rounded outline-none focus:border-purple-500 px-2'
                value={this.state.title}
                name='title'
                placeholder='Title'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='date'>
              <input
                id='date'
                type='date'
                className='w-full border-2 border-transparent
                p-2 rounded outline-none focus:border-purple-500 px-2'
                value={this.state.date}
                name='date'
                placeholder='Date'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='entry'>
              <textarea
                id='entry'
                className='w-full border-2 border-transparent
                p-2 rounded outline-none focus:border-purple-500 px-2'
                value={this.state.entry}
                name='entry'
                placeholder='Entry'
                onChange={e => this.setState({ entry: e.target.value })}
              />
            </label>
          </div>
          <button
            type='submit'
            className='py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-75 cursor-not-allowed rounded-lg mb-3'
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default CreateBlogPosts
