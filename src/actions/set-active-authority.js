export const setActiveAuthority = (id) => {
    return (dispatch) => {
      dispatch({
        type: "SET_ACTIVE_AUTHORITY",
        payload: id,
      });
    };
  };
