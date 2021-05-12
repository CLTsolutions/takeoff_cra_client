import React, { Component } from 'react'
import moment from 'moment' // formats date on card
import { FlightsState } from '../CRUD/CreateFlights'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import APIURL from '../../helpers/environment'

type acceptedProps = {
  token: string
  myFlights: []
  // fetchFlights: () => Promise<any> //from flightIndex & is returning data
  fetchFlights: Function
  editFlight: (flight: any) => void
  updateOn: () => void
}

interface FlightCardState extends FlightsState {
  id: number
}

export class FlightsCard extends Component<acceptedProps, FlightCardState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      id: Infinity,
      flights: [],
      airline: '',
      flightNumber: '', //'' so input value initializes empty (instead of 0)
      originAirport: '',
      destAirport: '',
      flightMiles: '', //'' so input value initializes empty (instead of 0)
      flightTime: '',
      international: false,
      date: '',
    }
  }

  deleteFlight = async (e: any, id: number) => {
    e.preventDefault()
    await fetch(`${APIURL}/flight/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
    return this.props.fetchFlights(e) // updating flight list after one is deleted
  }

  render() {
    let dateFormat = 'MM/DD/YYYY'
    return (
      <div>
        <div className='flex justify-center flex-wrap'>
          {this.props.myFlights.length > 0 ? (
            <>
              {this.props.myFlights.map((flight: any, index: number) => {
                {
                  console.log(flight)
                }
                return (
                  // <div className='flex font-sans justify-center items-center h-screen'>
                  <div
                    key={index}
                    // className='w-full max-w-sm mx-4 shadow-lg rounded-lg'
                    className='mx-8 my-12 w-80 rounded-lg bg-white border shadow-md overflow-hidden'
                  >
                    <div className='bg-white border-b-2 border-indigo-500 py-4 px-6 flex justify-between items-end rounded-lg rounded-b-none'>
                      <div className='h-8'>
                        <h5 className='text-blue-800'>{flight.airline}</h5>
                      </div>
                      <div>
                        <span className='text-blue-800 uppercase font-bold text-grey-darkest tracking-wide text-sm'>
                          {flight.flightNumber}
                        </span>
                      </div>
                    </div>
                    <div className='flex bg-blue-300 justify-around items-center py-16 px-6 sm:px-12 bg-destination'>
                      <div className='flex-1 text-5xl font-bold text-white tracking-wide text-shadow-lg'>
                        {flight.originAirport}
                      </div>
                      <div className='mx-8'>
                        <FontAwesomeIcon icon={faPlane} />
                      </div>
                      <div className='flex-1 text-right text-5xl font-bold text-white tracking-wide text-shadow-lg'>
                        {flight.destAirport}
                      </div>
                    </div>
                    <div className='flex bg-indigo-400 px-4 sm:px-12 py-4'>
                      <div className='w-1/4'>
                        <span className='uppercase text-purple-lighter block tracking-wide mb-1 text-md'>
                          date:
                        </span>
                        <span className='uppercase text-white block tracking-wide text-sm'>
                          {moment(flight.date).format(dateFormat)}
                        </span>
                      </div>
                      <div className='w-2/4'>
                        <span className='uppercase text-purple-lighter block tracking-wide mb-1 text-md'>
                          international:
                        </span>
                        {flight.international === true ? (
                          <span className='uppercase text-white text-center block tracking-wide text-sm'>
                            yes
                          </span>
                        ) : (
                          <span className='uppercase text-white text-center block tracking-wide text-sm'>
                            no
                          </span>
                        )}
                      </div>
                      <div className='w-1/4'>
                        <span className='uppercase text-purple-lighter block tracking-wide mb-1 text-md'>
                          miles:
                        </span>
                        <span className='uppercase text-white block tracking-wide text-sm'>
                          {flight.flightMiles}
                        </span>
                      </div>
                    </div>
                    <div className='py-3 px-6 sm:px-12 bg-white rounded-lg rounded-t-none'>
                      <div className='flex justify-center'>
                        <button
                          className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
                          onClick={() => {
                            this.props.editFlight(flight)
                            this.props.updateOn()
                          }}
                        >
                          Update
                        </button>
                        <button
                          className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
                          onClick={e => this.deleteFlight(e, flight.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <>
              <h3 className='mt-3'>
                Your flight library is empty. Create a flight!
              </h3>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default FlightsCard
