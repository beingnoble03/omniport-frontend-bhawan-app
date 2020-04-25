const initialState = {};

const pendingComplains = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PENDING_COMPLAINS":
      return action.payload;
    case "INCREASE_UNSUCCESFUL_ATTEMPT": {
        console.log(action.payload)
        console.log(state.results)
        state.results = state.results.map( complain =>
          (complain.id===action.payload.id)?
          action.payload:complain
          )
          console.log(state.results)
          return state
      }
    default:
      return state;
  }
};

export default pendingComplains;
