const initialState = {}

const resolvedComplains = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_RESOLVED_COMPLAINS':
          return action.payload
      case 'ADD_COMPLAINT':
        {
        state.unshift(action.payload)
        return state
        }
    default:
      return state
  }
}

export default resolvedComplains
