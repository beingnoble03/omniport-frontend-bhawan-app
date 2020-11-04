const initialState = {}

const presentBookingRequests = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRESENT_ROOM_BOOKINGS':
      return action.payload
    default:
      return state
  }
}

export default presentBookingRequests
