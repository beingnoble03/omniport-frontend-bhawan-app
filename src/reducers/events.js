const initialState = {}

const events = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_ALL_EVENTS':
          return action.payload
      case 'ADD_EVENT':
        {
          console.log("jhrf")
          console.log(action.payload)
        state.push(action.payload)
        return state
        }
    default:
      return state
  }
}

export default events
