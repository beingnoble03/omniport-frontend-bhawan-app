const initialState = {}

const defaultItems = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DEFAULT_ITEMS':
      return action.payload
    case 'ADD_DEFAULT_ITEM': {
      state.count++
      let results = state.results
      state.results = [action.payload, ...results]
      return state
    }
    default:
      return state
  }
}

export default defaultItems
