import React from 'react'
import { connect } from 'react-redux'

import moment from 'moment'
import { Card, Header, Icon, Segment } from 'semantic-ui-react'

import { Loading } from "formula_one"

import { getRoomBookings } from '../../actions/get-room-bookings'
import { bookingsUrl } from '../../urls'

import blocks from '../../css/app.css'
import main from './index.css'

class UpcomingBookings extends React.Component {
  state = {
    loading: true
  }

  componentDidMount () {
    this.props.getRoomBookings(
      bookingsUrl(this.props.activeHostel, 'False'),
      this.successCallBack,
      this.errCallBack
    )
  }

  successCallBack = (res) => {
    this.setState({
      loading: false
    })
  }

  errCallBack = (err) => {
    this.setState({
      loading: false
    })
  }

  render () {
    const { bookingRequests, constants } = this.props
    return (
      <React.Fragment>
        {!this.state.loading?
          (
            <React.Fragment>
              {bookingRequests.results && bookingRequests.results.length > 0
          ? bookingRequests.results.map((request, index) => {
            return (
              <Card fluid>
                <Card.Content styleName='blocks.card-border'>
                  <Header as='h4' styleName='blocks.zero-bottom-margin main.large main.black'>
                    {
                      constants.hostels[this.props.activeHostel]
                    }{' '}
                    Room
                  </Header>
                  <div styleName='main.small'>
                    <span
                      styleName={
                        request.status === 'cnf'
                          ? 'main.green'
                          : request.status === 'rej'
                            ? 'main.red'
                            : 'main.yellow'
                      }
                    >
                      {constants.statues.BOOKING_STATUSES[request.status]}
                    </span>{' '}
                    . <span>Booking ID</span> . <span>{request.id}</span>
                  </div>
                </Card.Content>
                <Card.Content styleName='blocks.card-border'>
                  <div styleName='main.flex main.space'>
                    <div styleName='main.flex'>
                      <div styleName='main.margin'>
                        <div styleName='main.large main.grey'>Check In</div>
                        <div styleName='main.mid main.black'>
                          {moment(request.requestedFrom, 'YYYY-MM-DD').format(
                            'LL'
                          )}
                        </div>
                      </div>
                      <div styleName='main.margin'>
                        <div styleName='main.large main.grey'>Check In</div>
                        <div styleName='main.mid main.black'>
                          {moment(request.requestedTill, 'YYYY-MM-DD').format(
                            'LL'
                          )}
                        </div>
                      </div>
                    </div>
                    <div styleName='main.center'>
                      <Icon name='users' />
                      {request.visitor.length} Visitors
                    </div>
                  </div>
                </Card.Content>
              </Card>
            )
          })
          : <Segment>No Upcoming Bookings found</Segment>}
            </React.Fragment>
          ):
          (
            <Loading />
          )
        }
      </React.Fragment>
    )
  }
}
function mapStateToProps (state) {
  return {
    bookingRequests: state.bookingRequests,
    activeHostel: state.activeHostel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomBookings: (residence, successCallBack, errCallBack) => {
      dispatch(getRoomBookings(residence, successCallBack, errCallBack))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingBookings)
