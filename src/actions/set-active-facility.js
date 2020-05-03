export const setActiveFacility = (id) => {
  console.log("ysbkcdjb")
    return (dispatch) => {
      dispatch({
        type: "SET_ACTIVE_FACILITY",
        payload: id,
      });
    };
  };
