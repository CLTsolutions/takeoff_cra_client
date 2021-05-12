import React, { Component } from 'react'
import Flights from '../Flights/Views/FlightsIndex'

type acceptedProps = {
  token: string
}
class Home extends Component<acceptedProps, {}> {
  constructor(props: acceptedProps) {
    super(props)
  }

  render() {
    return (
      <div>
        <Flights token={this.props.token} />
      </div>
    )
  }
}

export default Home
