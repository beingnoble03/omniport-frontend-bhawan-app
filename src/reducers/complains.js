const initialState = {}

const complains = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_ALL_COMPLAINS':
          return action.payload
      case 'ADD_COMPLAINT':
        {
          state.results.unshift(action.payload)
          state.results.pop()
          return state
        }
    default:
      return state
  }
}

export default complains
