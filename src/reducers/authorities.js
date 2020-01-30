const initialState = {}

const authorities = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_ALL_AUTHORITIES':
          return action.payload
    default:
      return state
  }
}

export default authorities
