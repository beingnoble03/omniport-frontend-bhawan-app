const initialState = 1
const activeAuthority = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_AUTHORITY':
      return action.payload
    default:
      return state
  }
}

export default activeAuthority
