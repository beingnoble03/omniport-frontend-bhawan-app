export const setActiveFacility = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_FACILITY',
      payload: id
    })
  }
}
