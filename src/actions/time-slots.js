import axios from "axios";

import { getCookie } from "formula_one/src/utils";

export const getTimeSlots = (residence) => {
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  };

  return (dispatch) => {
    axios
      .get(`/api/bhawan_app/${residence}/time_slot/`, { headers: headers })
      .then((res) => {
        dispatch({
          type: "GET_TIME_SLOTS",
          payload: res.data.results,
        });
      })
      .catch((err) => {});
  };
};

export const changeTimeSlot = (
  data,
  found,
  foundId,
  url,
  successCallBack,
  errorCallBack
) => {
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  };
  if (!found) {
    return (dispatch) => {
      axios
        .post(url, data, {
          headers: headers,
        })
        .then((res) => {
          successCallBack();
          dispatch({
            type: "ADD_TIME_SLOT",
            payload: item,
          });
        })
        .catch((err) => {
          errorCallBack(err);
        });
    };
  } else {
    return (dispatch) => {
      axios
        .patch(`${url}${foundId}/`, data, {
          headers: headers,
        })
        .then((res) => {
          successCallBack();
        })
        .catch((err) => {
          errorCallBack();
        });
    };
  }
};
