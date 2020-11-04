const initialState = {}

const pendingComplains = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PENDING_COMPLAINS':
      return action.payload
    case 'INCREASE_UNSUCCESFUL_ATTEMPT': {
      state.results = state.results.map(complain =>
        (complain.id === action.payload.id)
          ? action.payload : complain
      )
      return state
    }
    default:
      return state
  }
}

export default pendingComplains
