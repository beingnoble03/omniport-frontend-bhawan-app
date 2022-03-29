const initialState = {}

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ITEMS':
      return action.payload
    case 'ADD_ITEM': {
      return [...state, action.payload]
    }
    default:
      return state
  }
}

export default items
