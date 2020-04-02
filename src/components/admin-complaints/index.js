import React, { Component } from 'react'
import {connect} from 'react-redux'
import { TimeInput } from 'semantic-ui-calendar-react'
import {getComplains} from '../../actions/complains'
// import {approveOrConfirmRequest} from '../../actions/approve-or-confirm-request'
import { Menu, Header, Table, Button, Modal, Container, Icon } from 'semantic-ui-react'
import './index.css'

class AdminComplains extends Component {
  state =
   { open: false,
     pastComplainIcon: 'angle up',
     from: '',
     to: ''
    }

  componentDidMount() {
    this.props.getComplains()
  }
  show = () => () => this.setState({ open: true })
  close = () => this.setState({ open: false })

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  togglePastIcon = () => {
    const pastComplainIcon = this.state.pastComplainIcon
    pastComplainIcon === 'angle down' ?
      this.setState({pastComplainIcon: 'angle up'}):
      this.setState({pastComplainIcon: 'angle down'})
  }
  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    const {  open, pastComplainIcon } = this.state
    const { complains } = this.props
    return (
        <div>
    <Container>
    <Header as='h4'>Student Complains</Header>
      <Table celled >
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Complaint</Table.HeaderCell>
            <Table.HeaderCell>Applicant Name</Table.HeaderCell>
            <Table.HeaderCell>Complaint Type</Table.HeaderCell>
            <Table.HeaderCell>Complaint Date</Table.HeaderCell>
            <Table.HeaderCell>Contact Number</Table.HeaderCell>
            <Table.HeaderCell>Applicant Room</Table.HeaderCell>
            <Table.HeaderCell>Time Slot</Table.HeaderCell>
            <Table.HeaderCell>Unsuccesful attempts to solve</Table.HeaderCell>
            <Table.HeaderCell>Mark as resolved</Table.HeaderCell>
            {/* <Table.HeaderCell>{activeItem == 'pending'? "Approve Request": activeItem == 'approved'? 'Confirm Payment': 'Still No ideA'}</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
        { complains.length>0? (complains.map((complain,index) => {
            return (
                <Table.Row>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{complain.description}</Table.Cell>
                    <Table.Cell>{complain.complaintType}</Table.Cell>
                    <Table.Cell>{complain.complaintType}</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>contact number</Table.Cell>
                    <Table.Cell>{complain.roomNo}</Table.Cell>
                    <Table.Cell>{complain.availableFrom} - {complain.availableTill}</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Resolve</Table.Cell>
                    {/* <Table.Cell>{activeItem == 'pending'? "Approve": activeItem == 'approved'? 'Confirm': 'Still No ideA'}</Table.Cell> */}
                </Table.Row>
                )
            })):null
                        }
        </Table.Body>
        </Table>
<Header as='h4'>
  Select carpenter slot for today
  <TimeInput
          name="from"
          placeholder="From"
          value={this.state.from}
          iconPosition="left"
          onChange={this.handleChange}
        />
  <TimeInput
          name="to"
          placeholder="To"
          value={this.state.to}
          iconPosition="left"
          onChange={this.handleChange}
        />
</Header>
  <Header as='h4'>
    Past Bookings
    <Icon name={pastComplainIcon} onClick={this.togglePastIcon} />
  </Header>
  {pastComplainIcon==='angle down' &&
  (
    <Table celled >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Complaint</Table.HeaderCell>
        <Table.HeaderCell>Applicant Name</Table.HeaderCell>
        <Table.HeaderCell>Complaint Type</Table.HeaderCell>
        <Table.HeaderCell>Complaint Date</Table.HeaderCell>
        <Table.HeaderCell>Contact Number</Table.HeaderCell>
        <Table.HeaderCell>Applicant Room</Table.HeaderCell>
        <Table.HeaderCell>Time Slot</Table.HeaderCell>
        <Table.HeaderCell>Unsuccesful attempts to solve</Table.HeaderCell>
        <Table.HeaderCell>Mark as resolved</Table.HeaderCell>
     </Table.Row>
    </Table.Header>

    <Table.Body>
        { complains.length>0? (complains.map((complain,index) => {
            return (
                <Table.Row>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{complain.description}</Table.Cell>
                    <Table.Cell>{complain.complaintType}</Table.Cell>
                    <Table.Cell>{complain.complaintType}</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>contact number</Table.Cell>
                    <Table.Cell>{complain.roomNo}</Table.Cell>
                    <Table.Cell>{complain.availableFrom} - {complain.availableTill}</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Resolve</Table.Cell>
                    {/* <Table.Cell>{activeItem == 'pending'? "Approve": activeItem == 'approved'? 'Confirm': 'Still No ideA'}</Table.Cell> */}
                </Table.Row>
                )
            })):null
                        }
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
    return{
        complains: state.complains,
     }
  }

const mapDispatchToProps= dispatch => {
    return {
        getComplains: ()=> {
          dispatch(getComplains())
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AdminComplains)
