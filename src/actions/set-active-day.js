export const setActiveDay = (day) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_DAY',
      payload: day
    })
  }
}
