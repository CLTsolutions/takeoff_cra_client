import React, { Component } from 'react'
// import { FlightsInfo } from '../../types'
import * as HtmlDurationPicker from 'html-duration-picker'
import APIURL from '../../helpers/environment'

type acceptedProps = {
  token: any
  fetchFlights: () => void
}

export interface FlightsState {
  flights: []
  airline: string
  flightNumber: number | string //'' for empty input value on initialization
  originAirport: string
  destAirport: string
  flightMiles: number | string //'' for empty input value on initialization
  flightTime: string
  international: boolean
  date: string
}

class Flights extends Component<acceptedProps, FlightsState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
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

  // changes input fields to be uppercase
  inputToUppercase = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.value = ('' + e.target.value).toUpperCase()
  }

  //handles input fields onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    //prettier-ignore
    this.setState(({ [name]: value } as unknown) as Pick<FlightsState, keyof FlightsState>)
  }

  // for duration input field in form
  ngAfterViewInit() {
    HtmlDurationPicker.init()
  }

  newFlight = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const response = await fetch(`${APIURL}/flight/`, {
        method: 'POST',
        body: JSON.stringify({
          airline: this.state.airline,
          flightNumber: this.state.flightNumber,
          originAirport: this.state.originAirport,
          destAirport: this.state.destAirport,
          flightMiles: this.state.flightMiles,
          flightTime: this.state.flightTime,
          date: this.state.date,
          international: this.state.international,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        }),
      })
      const data = await response.json()
      // resets input fields after submit
      this.setState({
        airline: '',
        flightNumber: '',
        originAirport: '',
        destAirport: '',
        flightMiles: '',
        flightTime: '',
        date: '',
        international: false,
      })
      // calling flight library again after creating new flight
      this.props.fetchFlights()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <div className='bg-indigo-500 w-3/5 bg-opacity-60 max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl'>
          <h4 className='mb-4 text-center text-indigo-900'>
            Add a flight to your library.
          </h4>
          <form className='space-y-4' onSubmit={this.newFlight}>
            <div className='flex flex-col'>
              {/*'htmlFor links input to label by corresponding id for screen readers */}
              <label htmlFor='airline'>
                <input
                  id='airline'
                  type='text'
                  className='w-full border-2 border-transparent
                  p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Airline'
                  value={this.state.airline}
                  name='airline'
                  onChange={this.handleChange}
                  onInput={this.inputToUppercase}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightNumber'>
                <input
                  id='flightNumber'
                  type='number' // only nums allowed in input field
                  min='0' //prevents negative nums
                  className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Flight #'
                  value={this.state.flightNumber}
                  name='flightNumber'
                  onChange={this.handleChange}
                  onInput={this.inputToUppercase}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='originAirport'>
                <input
                  id='originAirport'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Origin Airport'
                  name='originAirport'
                  value={this.state.originAirport}
                  onChange={this.handleChange}
                  onInput={this.inputToUppercase}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='destAirport'>
                <input
                  id='destAirport'
                  type='text'
                  className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Destination Airport'
                  name='destAirport'
                  value={this.state.destAirport}
                  onChange={this.handleChange}
                  onInput={this.inputToUppercase}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightMiles'>
                <input
                  id='flightMiles'
                  type='number' // only nums allowed in input field
                  min='0' // prevents negative nums
                  className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Flight Miles'
                  name='flightMiles'
                  value={this.state.flightMiles}
                  onChange={this.handleChange}
                  onInput={this.inputToUppercase}
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='flightTime'>
                <input
                  id='flightTime'
                  // type='time'
                  // min='0'
                  // max='24'
                  className='html-duration-picker w-full border-2 border-transparent px-6 py-2 rounded focus:outline-none focus:border-purple-500'
                  data-hide-seconds
                  placeholder='Flight Time'
                  value={this.state.flightTime}
                  name='flightTime'
                  onChange={this.handleChange}
                  onInput={this.ngAfterViewInit} //html duration picker fn
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='date'>
                <input
                  id='date'
                  type='date'
                  // required type='date'
                  className='w-full border-2 border-transparent p-2 rounded outline-none focus:border-purple-500'
                  placeholder='Date'
                  value={this.state.date}
                  name='date'
                  required
                  pattern='\d{4}-\d{2}-\d{2}' //for unsupported browsers
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className='flex flex-col bg-white rounded py-2 px-2'>
              <label
                htmlFor='international'
                className='international flex flex-row items-center text-gray-900'
              >
                International:
                <input
                  id='international'
                  type='checkbox'
                  className='p-4 ml-3 mr-1 checked:bg-blue-600 checked:border-transparent'
                  checked={this.state.international}
                  name='international'
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <button
              type='submit'
              className='py-2 px-4 mb-3 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Flights
