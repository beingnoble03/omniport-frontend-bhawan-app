const initialState = {}

const facilities = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_FACILITY':
          return action.payload
    default:
      return state
  }
}

export default facilities
