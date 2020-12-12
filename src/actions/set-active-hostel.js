export const setActiveHostel = (hostelCode) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_HOSTEL',
      payload: hostelCode
    })
  }
}
