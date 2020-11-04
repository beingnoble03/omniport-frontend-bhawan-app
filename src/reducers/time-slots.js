const initialState = {}

const timeSlots = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TIME_SLOTS': {
      return action.payload
    }
    case 'ADD_TIME_SLOT': {
      return [...state, action.payload]
    }
    case 'EDIT_TIME_SLOT': {
      return state
    }
    default:
      return state
  }
}

export default timeSlots
