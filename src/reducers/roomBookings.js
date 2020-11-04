const initialState = {}

const bookingRequests = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ROOM_BOOKINGS':
      return action.payload
    case 'UPDATE_BOOKINGS':
      return state
    default:
      return state
  }
}

export default bookingRequests
