import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRoomBookings } from '../../actions/get-room-bookings'
import { updateBooking } from '../../actions/book-room'
import { Menu, Header, Table, Button, Modal, Container, Icon } from 'semantic-ui-react'
import './index.css'

class BookingRequests extends Component {
  state = { open: false,
            activeItem: 'pending',
            pastBookingIcon: 'angle up',
            message: '',
            success: false,
            err: false,
            activeId: null
          }

  componentDidMount() {
    this.props.getRoomBookings()
  }

  close = () => this.setState({ open: false })

  openModal = (activeId) => {
    this.setState({
      activeId: activeId,
      open: true,
    })
  }

  handleItemClick = (e, { name }) =>
  {
    this.setState({ activeItem: name })
  }

  fileChange = async e => {
    this.setState({
      [e.target.name]: e.target.files[0],
    })
    const imageDataUrl = await readFile(e.target.files[0])
    this.setState({
      imageSrc: imageDataUrl,
      open: true,
    })
  }

  updateBooking = () => {
    const { activeItem, activeId } = this.state
    // console.log(id)
    const body = {
      "status": activeItem == "pending" ? "fwd": activeItem == "forwarded" ? "apr" : "con"
    }
    console.log(body)
    this.props.updateBooking(
      activeId,
      body,
      this.props.who_am_i.residence,
      this.successCallBack,
      this.errCallBack
      )
      this.setState({
        open: false
      })
  }

  successCallBack = res => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
    })
  }

  errCallBack = err => {
    this.setState({
      error: true,
      success: false,
      message: err
    })
  }

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
              name="forwarded"
              active={activeItem === 'forwarded'}
              onClick={this.handleItemClick}
              color='blue'
              styleName="booking-menu"
            >
             Forwarded
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
                <Table.HeaderCell>Applicant Room</Table.HeaderCell>
                <Table.HeaderCell>No of Visitors</Table.HeaderCell>
                <Table.HeaderCell>From </Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Contact Number</Table.HeaderCell>
                <Table.HeaderCell>{activeItem == 'pending'? "Forward Request": activeItem == 'forwarded'? 'Approve Request': activeItem == 'approved'? 'Confirm Request':'Still No ideA'}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { bookingRequests.length>0? (bookingRequests.map((request,index) => {
                return (
                      <Table.Row>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{request.bookedBy}</Table.Cell>
                        <Table.Cell>{request.bookedByRoomNo}</Table.Cell>
                        <Table.Cell>{request.visitor.length}</Table.Cell>
                        <Table.Cell>{request.requestedFrom}</Table.Cell>
                        <Table.Cell>{request.requestedTill}</Table.Cell>
                        <Table.Cell>{request.phoneNumber}</Table.Cell>
                        <Table.Cell>
                          <span onClick={() => this.openModal(request.id)}>
                          {
                            activeItem == 'pending'?"Forward":
                            activeItem == 'forwarded'?'Approve':
                            activeItem == 'approved'?'Confirm':
                            'Still'
                           }
                           </span>
                        </Table.Cell>
                      </Table.Row>
                      )
                    })):
                    null
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
    <Modal size="mini" open={open} onClose={this.close}>
      <Modal.Header styleName="center">Approve Request?</Modal.Header>
      <Modal.Actions styleName="modalActions">
        <Button positive fluid onClick={this.updateBooking}>Yes</Button>
        <Button negative fluid onClick={this.close}>No</Button>
      </Modal.Actions>
    </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    bookingRequests: state.bookingRequests,
    // bookingOptions: state.bookingOptions
 }
}

const mapDispatchToProps= dispatch => {
  return {
    getRoomBookings: ()=> {
      dispatch(getRoomBookings())
  },
    updateBooking: (id, data, residence, successCallBack, errCallBack) => {
      dispatch(updateBooking(id, data, residence, successCallBack, errCallBack))
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRequests)
