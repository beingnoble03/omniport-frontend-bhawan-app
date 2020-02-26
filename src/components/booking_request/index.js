import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getRoomBookings } from '../../actions/get-room-bookings'
import {approveOrConfirmRequest} from '../../actions/approve-or-confirm-request'
import { Menu, Header, Table, Button, Modal, Container, Icon } from 'semantic-ui-react'
import './index.css'

class BookingRequests extends Component {
  state = { open: false, activeItem: 'pending', pastBookingIcon: 'angle up' }

  componentDidMount() {
    this.props.getRoomBookings()
  }
  show = () => () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  togglePastIcon = () => {
    const pastBookingIcon = this.state.pastBookingIcon
    pastBookingIcon === 'angle down' ?
      this.setState({pastBookingIcon: 'angle up'}):
      this.setState({pastBookingIcon: 'angle down'})
  }
  render() {
    const { activeItem, open, pastBookingIcon } = this.state
    const { bookingRequests } = this.props
    return (
        <div>
    <Container>
    <Header as='h4'>Room Bookings</Header>
    <Menu compact icon='labeled'>
          <Menu.Item
            name="pending"
            active={activeItem === 'pending'}
            onClick={this.handleItemClick}
            color='blue'
            styleName="booking-menu"
          >
           Pending
          </Menu.Item>
          <Menu.Item
            name="approved"
            active={activeItem === 'approved'}
            onClick={this.handleItemClick}
            color='blue'
            styleName="booking-menu"
          >
           Approved
          </Menu.Item>
          <Menu.Item
            name="confirmed"
            active={activeItem === 'confirmed'}
            onClick={this.handleItemClick}
            color='blue'
            styleName="booking-menu"
          >
            Confirmed
          </Menu.Item>
        </Menu>
      <Table celled >
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Applicant Name</Table.HeaderCell>
        <Table.HeaderCell>Occupancy</Table.HeaderCell>
        <Table.HeaderCell>No ofRooms</Table.HeaderCell>
        <Table.HeaderCell>Applicant Room</Table.HeaderCell>
        <Table.HeaderCell>No of Visitors</Table.HeaderCell>
        <Table.HeaderCell>From </Table.HeaderCell>
        <Table.HeaderCell>To</Table.HeaderCell>
        <Table.HeaderCell>Contact Number</Table.HeaderCell>
        <Table.HeaderCell>{activeItem == 'pending'? "Approve Request": activeItem == 'approved'? 'Confirm Payment': 'Still No ideA'}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    { bookingRequests.length>0? (bookingRequests.map((request,index) => {
                      return (
                        <Table.Row>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{request.bookedBy}</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>{request.visitor.length}</Table.Cell>
        <Table.Cell>{request.requestedFrom}</Table.Cell>
        <Table.Cell>{request.requestedTill}</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>{activeItem == 'pending'? "Approve": activeItem == 'approved'? 'Confirm': 'Still No ideA'}</Table.Cell>
      </Table.Row>
                      )
                    })):null
                    }
    </Table.Body>
  </Table>

  <Header as='h4'>
    Past Bookings
    <Icon name={pastBookingIcon} onClick={this.togglePastIcon} />
  </Header>
  {pastBookingIcon==='angle down' &&
  (
    <Table celled >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Applicant Name</Table.HeaderCell>
        <Table.HeaderCell>Occupancy</Table.HeaderCell>
        <Table.HeaderCell>No ofRooms</Table.HeaderCell>
        <Table.HeaderCell>Applicant Room</Table.HeaderCell>
        <Table.HeaderCell>No of Visitors</Table.HeaderCell>
        <Table.HeaderCell>From </Table.HeaderCell>
        <Table.HeaderCell>To</Table.HeaderCell>
        <Table.HeaderCell>Contact Number</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  )}

  </Container>
  <Button onClick={this.show('mini')}>Mini</Button>
    <Modal size="mini" open={open} onClose={this.close}>
      <Modal.Header styleName="center">Approve Request?</Modal.Header>
      <Modal.Actions styleName="modalActions">
        <Button positive fluid>Yes</Button>
        <Button negative fluid>No</Button>
      </Modal.Actions>
    </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state.bookingRequests)
  return{
    bookingRequests: state.bookingRequests,
 }
}

const mapDispatchToProps= dispatch => {
  return {
    getRoomBookings: ()=> {
      dispatch(getRoomBookings())
  },
    approveOrConfirmRequest: () => {
      dispatch(approveOrConfirmRequest())
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRequests)
