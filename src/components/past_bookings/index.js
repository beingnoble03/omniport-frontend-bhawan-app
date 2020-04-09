import React, { Component } from "react";
// import { Link } from 'react-router-dom'
import { Table, Menu, Button, Icon } from "semantic-ui-react";
import "./index.css";
export default class PastBookings extends Component {
  render() {
    return (
      <div>
        <Table celled compact styleName="card-margin">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Check IN</Table.HeaderCell>
              <Table.HeaderCell>Check Out</Table.HeaderCell>
              <Table.HeaderCell>No of Guest</Table.HeaderCell>
              <Table.HeaderCell>No of Rooms</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
