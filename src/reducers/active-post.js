const initialState = ''
const activePost = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_POST':
      return action.payload
    default:
      return state
  }
}

export default activePost
