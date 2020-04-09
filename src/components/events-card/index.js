import React from 'react'
import { connect } from 'react-redux'
import { Card, Form, Button, Input, Header  } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import './index.css'
import { getEvents } from '../../actions/events'
import { addEvent } from '../../actions/add-events'
import * as moment from 'moment';

class EventsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addEvent: false,
      event: '',
      venue: '',
      time: '',
    }
  }

  componentDidMount() {
    this.props.getEvents(this.props.who_am_i.residence)
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = e => {
    this.toggleAddEvent()
    let data = {
      "name": this.state.event,
      "date": "2020-02-13",
      "description": this.state.venue,
      "timings": [
        {
            "day": "mon",
            "start": this.state.time,
            "end": "00:00:00",
            "description": "tfgcygvjy"
        }
      ]
    }
    this.props.addEvent(data, this.props.who_am_i.residence, this.successCallBack, this.errCallBack)
  }

  successCallBack = res => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText
    })
  }

  errCallBack = err => {
    this.setState({
      error: true,
      success: false,
      message: err
    })
  }
  toggleAddEvent = () => {
    const addEvent = this.state.addEvent
    this.setState({
      addEvent: !addEvent
    })
  }
  render() {
    const {  dayEvents } = this.props

    return (
      <React.Fragment>
        <div styleName="day-heading">{moment(this.props.activeDay, 'YYYY-MM-DD').format('DD/MM/YYYY')}</div>
        <Card>
            <Card.Content>
                <Card.Header>
                  {location.pathname == '/bhawan_app/events'?
                    "On this day": "Todays events"
                }
                </Card.Header>
                {dayEvents.length>0?(dayEvents.map(event => {
                  return (
                    <div styleName="max-content-width">
                    <Card.Description>
                      {event.name}
                      <div styleName="display-flex">
                        <div styleName="min-margin">
                          {event.description}
                        </div>
                        <div>
                        {moment(event.timings[0].start, 'hh:mm:ss').format('hh:mm A')}
                        </div>
                      </div>
                    </Card.Description>
                  </div>
                  )
                })):"No event today"}
                <Header as='h5' onClick={this.toggleAddEvent}>
                  {!this.state.addEvent?
                    (<span>+</span>):null
                }
                  Add event
                  </Header>
                {this.state.addEvent?
                (
                  <Form>
                    <Form.Field
                      name='event'
                      placeholder='Event'
                      control={Input}
                      onChange={this.handleChange}
                      label='First name'
                      placeholder='First name'
                      required
                    />
                    <Form.Field
                      name='venue'
                      placeholder='Venue'
                      control={Input}
                      onChange={this.handleChange}
                      label='Venue'
                      placeholder='Venue'
                      required
                    />
                    <Form.Field required>
                        <label>Time</label>
                        <TimeInput
                          name='time'
                          value={this.state.time}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    <Button type='submit' fluid onClick={this.handleSubmit}>Submit</Button>
                  </Form>
                ):null
                  }
            </Card.Content>
          </Card>
        </React.Fragment>
    )
  }
}
function mapStateToProps(state){
  let dayEvents = []
  if(state.events && state.events.length > 0 && state.activeDay)
   dayEvents = state.events.filter(function (event) {
    return event.date == state.activeDay
  });
  return{
    events: state.events,
    activeDay: state.activeDay,
    dayEvents: dayEvents
  }
}
 const mapDispatchToProps= dispatch => {
  return {
    getEvents: (residence)=> {
      dispatch(getEvents(residence))
    },
    addEvent: (data, residence, successCallBack, errCallBack) => {
      dispatch(addEvent(data, residence, successCallBack, errCallBack))
    }
  }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(EventsCard)

