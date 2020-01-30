import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'

export default class Calendar extends React.Component {

  render () {
    return (
      <FullCalendar
        defaultView='dayGridMonth'
        ref={this.calendarRef}
        weekends
        aspectRatio='1.1'
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
      />
    )
  }
}
