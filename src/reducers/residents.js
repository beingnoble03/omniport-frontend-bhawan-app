const initialState = {}

const residents = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESIDENTS':
      return action.payload
    default:
      return state
  }
}

export default residents
