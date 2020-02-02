import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Table, Menu, Button, Icon } from 'semantic-ui-react'
// import navCss from "./index.css"
// import blocks from "../../css/app.css"
export default class PastBookings extends Component {
  

  render() {

    return (
        <div>
        <Table celled compact>
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell>ID</Table.HeaderCell>
             <Table.HeaderCell>Complaint</Table.HeaderCell>
             <Table.HeaderCell>Complain Type</Table.HeaderCell>
             <Table.HeaderCell>Complain Status</Table.HeaderCell>
             <Table.HeaderCell>Complain Date</Table.HeaderCell>
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
    )
  }
}
