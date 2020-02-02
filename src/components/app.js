import React, { Suspense, lazy} from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import {Switch, Route} from 'react-router-dom'
import { Segment, Container, Grid } from 'semantic-ui-react'

import { AppHeader, AppFooter, AppMain, Loading, getTheme } from 'formula_one'
// import Nav  from './navbar/index'
const Nav = lazy(() => import('./navbar/index'))
const BookRoom = lazy(() => import('./book_room/index'))
const ComplainRegister = lazy(() => import('./complain_register/index'))
const Authorities = lazy(() => import('./authorities/index'))
const Facilities = lazy(() => import('./facilities/index'))
const Calendar = lazy(() => import('./calendar/index'))
const MyInfo = lazy(() => import('./my_info/index'))
import AdminFacility from './admin_facility'
import MyProfile from './my_profile/index'
import Facility from './facility/index'
import BookingsRequest from './booking_request/index'
import PastBookings from './past_bookings_admin/index'
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
                <Grid.Column width={12} floated='left'>
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
                      path={`${match.path}profile`}
                      render={props => (
                        <MyProfile />
                      )}
                    />
                  <Route
                      path={`${match.path}`}
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
                  </Switch>
                </Grid.Column>
                <Grid.Column width={3} floated='right'>
                  <MyInfo />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                <Route
                  path={`${match.path}`} exact
                  render={props => (
                    <Authorities />
                  )}
                    />
                  </Grid.Column>
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
