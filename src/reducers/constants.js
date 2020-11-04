const initialState = {}

const constants = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_CONSTANTS':
      return action.payload
    default:
      return state
  }
}

export default constants
