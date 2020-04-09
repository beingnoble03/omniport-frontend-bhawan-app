import axios from "axios";

export const getFacilities = (residence) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `/api/bhawan_app/${residence}/facility/`,
    })
      .then((response) => {
        let item = response.data.results;
        dispatch({
          type: "GET_FACILITY",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};
