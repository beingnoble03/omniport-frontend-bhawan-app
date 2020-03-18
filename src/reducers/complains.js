const initialState = {}

const complains = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_ALL_COMPLAINS':
          return action.payload
      case 'ADD_COMPLAINT':
        state.push(action.payload)
        return state;
    default:
      return state
  }
}

export default complains
