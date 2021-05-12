import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import APIURL from '../../helpers/environment'
import { FlightsState } from '../CRUD/CreateFlights'
// import * as HtmlDurationPicker from 'html-duration-picker'

interface acceptedProps {
  token: string
  updateOff: () => void
  fetchFlights: () => void
  // updateFlight: string
  updateFlight: any
  // updateFlight: {[key: string]: string | number} // updateFlight returns an object (flight with key/value pairs)
  open: boolean
}

interface EditFlightsModalState extends FlightsState {
  isModalVisible: boolean
}
//prettier-ignore
export class EditFlightsModal extends Component<acceptedProps, EditFlightsModalState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      isModalVisible: true,
      flights: [],
      airline: this.props.updateFlight.airline,
      flightNumber: this.props.updateFlight.flightNumber,
      originAirport: this.props.updateFlight.originAirport,
      destAirport: this.props.updateFlight.destAirport,
      flightMiles: this.props.updateFlight.flightMiles,
      flightTime: this.props.updateFlight.flightTime,
      international: this.props.updateFlight.international,
      // date: new Date()
      date: this.props.updateFlight.date,
    }
  }

  editFlight = async () => {
    try {
      const response = await fetch(
        `${APIURL}/flight/${this.props.updateFlight.id}`,
        {
          method: 'PUT',
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
        }
      )
      const data = await response.json()
      this.props.updateOff()
      this.props.fetchFlights() // calling flight library again after updating new flight
    } catch (err) {
      console.log(err)
    }
  }

  // changes input field to uppercase
  inputToUppercase = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.value = ('' + e.target.value).toUpperCase()
  }

  // handles input fields onChange
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    //prettier-ignore
    this.setState(({ [name]: value } as unknown) as Pick<FlightsState,keyof FlightsState>)
  }

  modalToggle = () => {
    this.setState({ isModalVisible: false })
    this.props.updateOff()
  }

  render() {
    return (
      <div>
        <div>
          <Modal
            isOpen={this.state.isModalVisible} 
            toggle={this.modalToggle}
          >
            <ModalHeader toggle={this.modalToggle}>Update your blog post.</ModalHeader>
            <ModalBody>
              <div className='flex flex-col'>
                {/*'htmlFor links input to label by corresponding id for screen readers */}
                <label htmlFor='theAirline'>
                  <input
                    id='theAirline'
                    type='text'
                    className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Airline'
                    value={this.state.airline}
                    name='airline'
                    onChange={this.handleChange}
                    onInput={this.inputToUppercase}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='theFlightNumber'>
                  <input
                    id='theFlightNumber'
                    type='number' // only nums allowed in input field
                    min='0' //prevents negative nums
                    className='w-full border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500'
                    placeholder='Flight #'
                    value={this.state.flightNumber}
                    name='flightNumber'
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='theOriginAirport'>
                  <input
                    id='theOriginAirport'
                    type='text'
                    className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Origin Airport'
                    name='originAirport'
                    value={this.state.originAirport}
                    onChange={this.handleChange}
                    onInput={this.inputToUppercase}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='theDestAirport'>
                  <input
                    id='theDestAirport'
                    type='text'
                    className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Destination Airport'
                    name='destAirport'
                    value={this.state.destAirport}
                    onChange={this.handleChange}
                    onInput={this.inputToUppercase}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='theFlightMiles'>
                  <input
                    id='theFlightMiles'
                    type='number' // only nums allowed in input field
                    min='0' // prevents negative nums
                    className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Flight Miles'
                    name='flightMiles'
                    value={this.state.flightMiles}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='theFlightTime'>
                  <input
                    id='theFlightTime'
                    type='text'
                    // min='0'
                    // max='24'
                    className='html-duration-picker w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                    data-hide-seconds
                    placeholder='Flight Time'
                    value={this.state.flightTime}
                    name='flightTime'
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='tripDate'>
                  <input
                    id='tripDate'
                    type='date'
                    // required type='date'
                    className='w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-purple-500'
                    placeholder='Date'
                    value={this.state.date}
                    name='date'
                     required pattern="\d{4}-\d{2}-\d{2}" //for unsupported browsers
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className='flex flex-col'>
                <label
                  htmlFor='international'
                  className='international flex flex-row items-center text-gray-400'
                >
                  International:
                  <input
                    id='international'
                    type='checkbox'
                    className='p-4 ml-3 mr-1 checked:bg-blue-600 checked:border-gray-200'
                    checked={this.state.international}
                    name='international'
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              </ModalBody>
            <ModalFooter>
          <button
            className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
            onClick={() => {
              this.editFlight()
              this.modalToggle()
            }}
          >
            Update
          </button>
          <button
            className='py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 cursor-not-allowed rounded-lg mx-2 tracking-wide'
            onClick={this.modalToggle}
          >
            Cancel
          </button>
        </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default EditFlightsModal
