const initialState = 1
const activeFacility = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_FACILITY':
      return action.payload
    default:
      return state
  }
}

export default activeFacility
