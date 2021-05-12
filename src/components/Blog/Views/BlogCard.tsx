import React, { Component } from 'react'
import moment from 'moment' // formats date on card
import { CreateBlogPostsState } from '../CRUD/CreateBlogPosts'
import '../Views/BlogCard.css'
import APIURL from '../../helpers/environment'

type acceptedProps = {
  token: string
  // blogData: []
  blogData: Array<object>
  fetchBlog: () => Promise<any>
  editBlog: (blog: string) => void
  updateOn: () => void
}

interface BlogsCardState extends CreateBlogPostsState {
  id: number
}

export class BlogsCard extends Component<acceptedProps, BlogsCardState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      id: Infinity,
      blog: [],
      date: '',
      title: '',
      entry: '',
    }
  }

  deleteBlog = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    await fetch(`${APIURL}/blog/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
    return this.props.fetchBlog() // updating blog list after one is deleted
  }

  render() {
    let dateFormat = 'MM/DD/YYYY'
    return (
      <div className='flex justify-center flex-wrap'>
        {this.props.blogData.length > 0 ? (
          <>
            {this.props.blogData.map((post: any, index: number) => {
              return (
                <div
                  key={index}
                  className='bg-indigo-500 bg-opacity-70 overflow-hidden shadow-2xl rounded-lg h-auto w-2/3 my-4 p-2 border-2 border-indigo-400'
                >
                  <p className='text-shadow text-white text-md font-medium px-2'>
                    {moment(post.date).format(dateFormat)}
                  </p>
                  <p className='text-shadow bg-opacity-60 text-white text-2xl font-medium px-2'>
                    {post.title}
                  </p>
                  <p className='bg-gray-100 bg-opacity-80 text-md p-3 rounded-md text-gray-900 border-2 border-gray-200'>
                    {post.entry}
                    <div className='flex justify-center mt-4'>
                      <button
                        className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-75 cursor-not-allowed rounded-lg mx-2 tracking-wide'
                        onClick={() => {
                          this.props.editBlog(post)
                          this.props.updateOn()
                        }}
                      >
                        Update
                      </button>
                      <button
                        className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-75 cursor-not-allowed rounded-lg mx-2 tracking-wide'
                        onClick={e => this.deleteBlog(e, post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </p>
                </div>
              )
            })}
          </>
        ) : (
          <>
            <h3>Create a blog post!</h3>
          </>
        )}
      </div>
      // </div>
    )
  }
}

export default BlogsCard
