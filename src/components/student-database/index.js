import React, { Component } from 'react'
import { Header, Table, Icon, Container } from 'semantic-ui-react'

export default class StudentDatabase extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <div>
    <Header as='h4'>Student Database </Header>
      <Container>
      <Table celled >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Enrollment No</Table.HeaderCell>
        <Table.HeaderCell>Room No.</Table.HeaderCell>
        <Table.HeaderCell>Contact No.</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  </Container>
      </div>
    )
  }
}