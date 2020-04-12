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
          type: "GET_FACILITIES",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};

export const getFacility = (residence, id, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios
      .get(`/api/bhawan_app/${residence}/facility/${id}`)
      .then((res) => {
        successCallBack(res);
        dispatch({
          type: "GET_FACILITY",
          payload: res.data,
        });
      })
      .catch((err) => {
        errCallBack(err);
      });
  };
};
