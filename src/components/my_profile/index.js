import React from 'react'
import {connect} from 'react-redux'
import { Container, Header, Table, Divider, Menu, Segment,Grid } from 'semantic-ui-react'
import { getFacilities } from '../../actions/facilities'
import UpcomingBookings from '../upcoming_bookings/index'
import PastBookings from '../past_bookings/index'
import { getComplains } from '../../actions/complains'
import facilities from './index.css'
import blocks from '../../css/app.css'

class MyProfile extends React.Component {
    state = {}
  componentDidMount(){
    this.props.getComplains()
  }
handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    const { complains } = this.props
    return (
      <Container>
        <Header size='medium'>My Complaints</Header>
        <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Complaint</Table.HeaderCell>
        <Table.HeaderCell>Complain Type</Table.HeaderCell>
        <Table.HeaderCell>Complain Status</Table.HeaderCell>
        <Table.HeaderCell>Complain Date</Table.HeaderCell>
        <Table.HeaderCell>Applicant Room</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      { complains.length>0? (complains.map((complain,index) => {
        return (
          <Table.Row>
          <Table.Cell>{index + 1}</Table.Cell>
          <Table.Cell>{complain.description}</Table.Cell>
          <Table.Cell>{complain.complaintType}</Table.Cell>
          <Table.Cell>{complain.status}</Table.Cell>
        <Table.Cell>{complain.roomNo}</Table.Cell>
          <Table.Cell>{complain.roomNo}</Table.Cell>
        </Table.Row>
        )

      })):null

      }
    </Table.Body>
  </Table>
  <Divider/>

      <Menu compact icon='labeled'>
      <Menu.Item
      name=""
      active={activeItem === 'upcoming'}
      onClick={this.handleItemClick}
      >
        Upcoming Bookings
      </Menu.Item>
      <Menu.Item
      name=""
      active={activeItem === 'past'}
      onClick={this.handleItemClick}
      >
        Past Bookings
      </Menu.Item>
      </Menu>
      <UpcomingBookings />
      <PastBookings />
    </Container>
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
    }
  }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)


 