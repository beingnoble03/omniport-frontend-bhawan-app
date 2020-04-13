const initialState = {}

const pendingComplains = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_PENDING_COMPLAINS':
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

export default pendingComplains
