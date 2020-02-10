import React, { Component } from 'react'
import { Menu, Header, Table, Button, Modal, Container, Icon } from 'semantic-ui-react'
import './index.css'
export default class BookingRequests extends Component {
  state = { open: false, activeItem: 'pending', pastBookingIcon: 'angle up' }

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
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
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
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
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
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
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