const initialState = 1;
const activeFacility = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_FACILITY':
          console.log("redyfg")
          console.log(action.payload)
            return action.payload
      default:
        return state
    }
  }

export default activeFacility
