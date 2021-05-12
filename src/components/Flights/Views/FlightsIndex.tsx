import React, { Component } from 'react'
import FlightsCard from './FlightsCard'
import CreateFlights from '../CRUD/CreateFlights'
import EditFlightsModal from '../CRUD/EditFlightsModal'
import './FlightIndex.css'
import APIURL from '../../helpers/environment'

type acceptedProps = {
  token: any
}

interface FlightsState {
  myFlights: []
  // myFlights: Array<number>
  updateActive: boolean
  updateFlight: { [key: string]: string | number } // updateFlight returns an object (flight with key/value pairs)
  open: boolean
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      myFlights: [],
      open: true,
      updateActive: false,
      updateFlight: {},
    }
  }

  fetchFlights = async () => {
    try {
      const response = await fetch(`${APIURL}/flight/mine`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
      })
      const data = await response.json()
      this.setState({ myFlights: data })
      return data
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.fetchFlights() // triggering a rerender to display newly created flights
  }

  editFlight = (flight: any) => {
    this.setState({ updateFlight: flight })
  }

  updateOn = () => {
    this.setState({ updateActive: true })
  }

  updateOff = () => {
    this.setState({ updateActive: false })
  }

  render() {
    return (
      <div className='bg'>
        <div className='flex flex-col md:flex-row h-screen'>
          <div className='items-center lg:w-1/3 md:w-full'>
            <CreateFlights
              token={this.props.token}
              fetchFlights={this.fetchFlights}
            />
          </div>
          <div className='items-center lg:w-2/3 md:w-full'>
            <FlightsCard
              token={this.props.token}
              myFlights={this.state.myFlights}
              fetchFlights={this.fetchFlights}
              editFlight={this.editFlight}
              updateOn={this.updateOn}
            />
            {this.state.updateActive ? (
              <EditFlightsModal
                token={this.props.token}
                fetchFlights={this.fetchFlights}
                updateFlight={this.state.updateFlight}
                updateOff={this.updateOff}
                open={this.state.open}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Flights
