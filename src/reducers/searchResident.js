const initialState = {}

const searchResidentResults = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_RESIDENT':
      return action.payload
    default:
      return state
  }
}

export default searchResidentResults
