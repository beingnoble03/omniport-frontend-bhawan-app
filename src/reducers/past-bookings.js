const initialState = {}

const pastBookingRequests = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_PAST_ROOM_BOOKINGS':
          return action.payload
    default:
      return state
  }
}

export default pastBookingRequests
