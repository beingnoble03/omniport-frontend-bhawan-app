const initialState = {}

const bookingRequests = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_ALL_ROOM_BOOKINGS':
          return action.payload
    default:
      return state
  }
}

export default bookingRequests
