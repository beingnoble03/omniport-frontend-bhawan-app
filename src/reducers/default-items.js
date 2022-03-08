const initialState = {}

const defaultItems = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DEFAULT_ITEMS':
      return action.payload
    case 'ADD_DEFAULT_ITEM': {
      return [...state, action.payload]
    }
    default:
      return state
  }
}

export default defaultItems
