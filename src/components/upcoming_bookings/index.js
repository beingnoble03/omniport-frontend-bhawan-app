import React from 'react'
import { connect } from 'react-redux'

import moment from 'moment'
import { Card, Header, Icon } from 'semantic-ui-react'

import { getRoomBookings } from '../../actions/get-room-bookings'
import { bookingsUrl } from '../../urls'

import blocks from '../../css/app.css'
import main from './index.css'

class UpcomingBookings extends React.Component {
  componentDidMount () {
    this.props.getRoomBookings(
      bookingsUrl(this.props.activeHostel, 'False')
    )
  }
  render () {
    const { bookingRequests, constants } = this.props
    return (
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
          : null}
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
    getRoomBookings: (residence) => {
      dispatch(getRoomBookings(residence))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingBookings)
