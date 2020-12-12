const initialState = 1
const activeHostel = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_HOSTEL':
      return action.payload
    default:
      return state
  }
}

export default activeHostel
