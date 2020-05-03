import axios from "axios";

import { getCookie } from "formula_one/src/utils";

export const getFacilities = (url) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
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

export const addFacility = (url, data, successCallBack, errCallBack) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    "X-CSRFToken": getCookie("csrftoken"),
  };
  return (dispatch) => {
    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        successCallBack(res);
        dispatch({
          type: "ADD_FACILITY",
          payload: res.data,
        });
      })
      .catch((err) => {
        errCallBack();
      });
  };
};
export const editFacility = (url, data, successCallBack, errCallBack) => {
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  };
  return (dispatch) => {
    axios
      .patch(url, data, { headers: headers })
      .then((res) => {
        successCallBack(res);
        dispatch({
          type: "EDIT_FACILITY",
          payload: res.data,
        });
      })
      .catch((err) => {
        errCallBack(err);
      });
  };
};
