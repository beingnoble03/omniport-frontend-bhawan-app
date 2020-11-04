const initialState = {}

const whoAmI = (state = initialState, action) => {
  switch (action.type) {
    case 'WHO_AM_I':
      return action.payload
    default:
      return state
  }
}

export default whoAmI
