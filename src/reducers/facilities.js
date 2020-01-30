const initialState = {}

const facility = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_FACILITY':
          return action.payload
    default:
      return state
  }
}

export default facility
