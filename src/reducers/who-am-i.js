const initialState = {}

const who_am_i = (state = initialState, action) => {
  switch (action.type) {
      case 'WHO_AM_I':
          return action.payload
    default:
      return state
  }
}

export default who_am_i
