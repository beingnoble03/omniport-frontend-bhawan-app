const initialState = {}

const searchPersonResults = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_PERSON_RESULTS':
      return action.payload
    default:
      return state
  }
}

export default searchPersonResults
