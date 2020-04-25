const initialState = {}

const resolvedComplains = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_RESOLVED_COMPLAINS':
          return action.payload
    default:
      return state
  }
}

export default resolvedComplains
