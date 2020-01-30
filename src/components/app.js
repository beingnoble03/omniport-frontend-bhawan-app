import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Scrollbars } from 'react-custom-scrollbars'
import { Segment, Container } from 'semantic-ui-react'

import { AppHeader, AppFooter, AppMain, getTheme } from 'formula_one'
import Nav  from './navbar/index'
import BookRoom from './book_room/index'
import ComplainRegister from './complain_register/index'
import Authorities from './authorities/index'
import Facilities from './facilities/index'
import AdminFacility from './admin_facility'
import MyInfo from './my_info/'
import Facility from './facility/index'
import BookingsRequest from './booking_request/index'
import PastBookings from './past_bookings/index'
import Calendar from './calendar/index'
import main from 'formula_one/src/css/app.css'
import blocks from '../css/app.css'
import StudentDatabase from './studentDatabase/index'
import RegisterStudent from './register_student/index'
import BookingRequests from './booking_request/index'

class App extends Component {
  render () {
    const creators = [
      {
        name: 'Ritvik Jain',
        role: 'Backend developer',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Suyash Salampuria',
        role: 'Frontend developer',
        link: 'https://github.com/SuyashSalampuria/'
      },
      {
        name: 'Kashish Jagyasi',
        role: 'Designer',
        link: 'https://pradumangoyal.github.io'
      }
    ]

    return (
      <div styleName='blocks.content-div'>
        <AppHeader appName='bhawan_app' mode='app' />
        <AppMain>
          <Nav />
          {/* <div styleName='blocks.content-div'><Home /></div> */}
          {/* <div><Facilities /></div> */}
            {/* <div><Authorities /></div> */}
          <div styleName='main.app-main'>
          {/* <div><AdminFacility /></div> */}
          {/* <div><PastBookings /></div> */}
          {/* <div><BookingRequests /></div> */}
          {/* <div><StudentDatabase /></div> */}
          {/* <div><RegisterStudent/></div> */}
          {/* <div><Calendar /></div> */}
          {/* <div><MyInfo/></div> */}
            <div><Authorities /></div>
                {/* <div><Facility /></div> */}
                {/* <Calendar /> */}
                {/* <BookRoom></BookRoom> */}
                {/* <div><ComplainRegister /></div> */}
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
