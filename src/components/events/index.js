import React from 'react'
import { connect } from 'react-redux'

import './index.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

import {getEvents} from '../../actions/events'
import { setActiveDay } from '../../actions/set-active-day'

class Events extends React.Component {
  componentDidMount() {
    this.props.getEvents()
  }
  handleDateClick = (arg) => {
    console.log(arg.dateStr)
    this.props.setActiveDay(arg.dateStr)
  }

  render() {
    return (
      <FullCalendar
        defaultView='dayGridMonth'
        ref= {this.calendarRef}
        dateClick={this.handleDateClick}
        weekends={true}
        aspectRatio='1.3'
        events={this.props.mappedEvents}
        plugins={[dayGridPlugin, interactionPlugin]}
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
      />
    )
  }
}
function mapStateToProps(state){
  let mappedEvents = []
  if(state.events && state.events.length > 0){
    state.events.forEach(event =>
      mappedEvents.push({
        title: event.name,
        date: event.date,
      })
    )
  }
  return{
    events: state.events,
    mappedEvents: mappedEvents,
  }
}
 const mapDispatchToProps= dispatch => {
  return {
    getEvents: ()=> {
      dispatch(getEvents())
    },
    setActiveDay: (day) => {
      dispatch(setActiveDay(day))
    }

  }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(Events)
