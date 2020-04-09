import axios from "axios";

export const getAllAuthorities = (residence) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `/api/bhawan_app/${residence}/contact/`,
    })
      .then((response) => {
        let item = response.data.results;
        dispatch({
          type: "GET_ALL_AUTHORITIES",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};
