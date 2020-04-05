const initialState = {}

const timeSlots = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_TIME_SLOTS':
          return action.payload
      case 'UPDATE_BOOKINGS':
          console.log("ufvty")
    default:
      return state
  }
}

export default timeSlots
