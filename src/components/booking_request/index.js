import React, { Component } from 'react'
import { Menu, Header, Table, Button, Modal, Container } from 'semantic-ui-react'
import './index.css'
export default class BookingRequests extends Component {
  state = { open: false }

  show = () => () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { open } = this.state

    return (
        <div>
    <Container>
    <Header as='h4'>Room Bookings</Header>
      <Menu compact>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Pending
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        >
          Approved
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Confirmed
        </Menu.Item>
      </Menu>
      {/* </Container>
      <Container> */}
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