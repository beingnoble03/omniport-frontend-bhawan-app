import React from 'react'
import { connect } from 'react-redux'
import { Card, Form, Button, Input, Header  } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import './index.css'
import { getEvents } from '../../actions/events'
import { addEvent } from '../../actions/add-events'

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
    this.props.getEvents()
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
    addEvent(data, this.successCallBack, this.errCallBack)
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
    const { events } = this.props
    return (
        <Card>
            <Card.Content>
                <Card.Header>Todays events</Card.Header>
                {events.length>0?(events.map(event => {
                  return (
                    <div styleName="max-content-width">
                    <Card.Description>
                      {event.name}
                      <div styleName="display-flex">
                        <div>
                          {event.description}
                        </div>
                        <div>
                          {event.timings[0].start}
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
    )
  }
}
function mapStateToProps(state){
  return{
    events: state.events,
  }
}
 const mapDispatchToProps= dispatch => {
  return {
    getEvents: ()=> {
      dispatch(getEvents())
    }
  }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(EventsCard)

