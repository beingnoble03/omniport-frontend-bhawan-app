var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

const initialState = yyyy + '-' + mm + '-' + dd;

const activeDay = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_ACTIVE_DAY':
          return action.payload
    default:
      return state
  }
}

export default activeDay
