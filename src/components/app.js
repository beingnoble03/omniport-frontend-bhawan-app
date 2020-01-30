import React, { Suspense, lazy} from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import {Switch, Route} from 'react-router-dom'
import { Segment, Container, Grid } from 'semantic-ui-react'

import { AppHeader, AppFooter, AppMain, Loading, getTheme } from 'formula_one'
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

class App extends React.Component {
  constructor (props) {
    super(props)
    this.divRef = React.createRef()
  }

  scrollDiv = () => {
    if (this.divRef && this.divRef.current) {
      this.divRef.current.scrollTo(0, 0)
    }
  }

  render () {
    const { match } = this.props
    console.log(match)
    return (
      <div ref={this.divRef} styleName='blocks.app-wrapper'>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path={`${match.path}`}
              render={props => (
                <AppHeader
                  appName='bhawan_app'
                  mode='app'
                  userDropdown
                />
              )}
            />
          </Switch>
          <Switch>
            <Route
              path={`${match.path}`}
              render={props => (
                <Nav/>
              )}
            />
          </Switch>
          <div styleName='blocks.app-container'>
            <Grid container>
              <Grid.Row>
                <Switch>
                <Route
                    path={`${match.path}book_room`}
                    render={props => (
                      <BookRoom />
                    )}
                  />
                <Route
                    path={`${match.path}complain`}
                    render={props => (
                      <ComplainRegister />
                    )}
                  />
                <Route
                    path={`${match.path}facilities`}
                    render={props => (
                      <Facilities />
                    )}
                  />
                  <Route
                    path={`${match.path}calendar`}
                    render={props => (
                      <Calendar />
                    )}
                  />
                  <Route
                    path={`${match.path}`}
                    render={props => (
                      <Authorities />
                    )}
                  />
                </Switch>
              </Grid.Row>
            </Grid>
          </div>
        </Suspense>
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
