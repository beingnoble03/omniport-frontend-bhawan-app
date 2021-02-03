export const setActivePost = (designation) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_POST',
      payload: designation
    })
  }
}
