import React, { Component } from 'react'
import BlogCard from './BlogCard'
import CreateBlogPosts from '../CRUD/CreateBlogPosts'
import EditPostsModal from '../CRUD/EditPostsModal'
import './BlogIndex.css'
import APIURL from '../../helpers/environment'

type acceptedProps = {
  token: string
}

interface BlogIndexState {
  blogData: []
  updateBlog: string
  updateActive: boolean
  open: boolean
}

class BlogIndex extends Component<acceptedProps, BlogIndexState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      // blog: '',
      blogData: [],
      open: true,
      updateActive: false,
      updateBlog: '',
    }
  }

  // wrapped in if to check if there's a token before it runs
  fetchBlog = async () => {
    if (this.props.token) {
      try {
        const response = await fetch(`${APIURL}/blog/mine`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
          },
        })
        const data = await response.json()
        this.setState({ blogData: data })
        return data
      } catch (err) {
        console.log(err)
      }
    }
  }

  componentDidMount = () => {
    this.fetchBlog()
  }

  // eli added because token wasn't being passed before fetch called
  // calling fetch again until token passes
  componentDidUpdate(prev: acceptedProps) {
    if (prev.token !== this.props.token) {
      this.fetchBlog()
    }
  }

  editBlog = (blog: string) => {
    this.setState({ updateBlog: blog })
  }

  updateOn = () => {
    this.setState({ updateActive: true })
  }

  updateOff = () => {
    this.setState({ updateActive: false })
  }

  render() {
    return (
      <div className='blog-bg'>
        <CreateBlogPosts token={this.props.token} fetchBlog={this.fetchBlog} />
        <BlogCard
          token={this.props.token}
          blogData={this.state.blogData}
          fetchBlog={this.fetchBlog}
          editBlog={this.editBlog}
          updateOn={this.updateOn}
        />
        {this.state.updateActive ? (
          <EditPostsModal
            token={this.props.token}
            fetchBlog={this.fetchBlog}
            updateBlog={this.state.updateBlog}
            updateOff={this.updateOff}
            open={this.state.open}
          />
        ) : (
          <></>
        )}
      </div>
    )
  }
}

export default BlogIndex
