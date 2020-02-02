const initialState = {}

const complains = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_ALL_COMPLAINS':
          return action.payload
    default:
      return state
  }
}

export default complains
