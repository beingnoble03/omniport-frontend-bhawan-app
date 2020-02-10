import React from 'react'
import {connect} from 'react-redux'
import { Container, Header, Table, Divider, Menu, Segment,Grid } from 'semantic-ui-react'
import { getFacilities } from '../../actions/facilities'
import UpcomingBookings from '../upcoming_bookings/index'
import PastBookings from '../past_bookings/index'
import Complains from '../complains/index'
import { getComplains } from '../../actions/complains'
import facilities from './index.css'
import blocks from '../../css/app.css'

class MyProfile extends React.Component {
    state = { activeItem: 'upcoming'  }
  componentDidMount(){
    this.props.getComplains()
  }
handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    const { complains } = this.props
    return (
      <Container>
        <Complains />
        <Divider/>
        <Menu compact icon='labeled'>
          <Menu.Item
            name="upcoming"
            active={activeItem === 'upcoming'} 
            onClick={this.handleItemClick}
            color='blue'
            styleName="facilities.booking-menu"
          >
           Upcoming Bookings
          </Menu.Item>
          <Menu.Item
            name="past"
            active={activeItem === 'past'}
            onClick={this.handleItemClick}
            color='blue'
            styleName="facilities.booking-menu"
          >
           Past Bookings
          </Menu.Item>
        </Menu>
        {activeItem ==='past'? (
          <PastBookings />
        ):
        (<UpcomingBookings />)
        }
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