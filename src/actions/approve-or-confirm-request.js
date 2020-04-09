import axios from "axios";

import { getCookie } from "formula_one/src/utils";

export const approveOrConfirmRequest = (data, successCallBack, errCallBack) => {
  let headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  };

  axios
    .put(`/api/bhawan_app/${residence}/room_booking/`, data, {
      headers: headers,
    })
    .then((res) => {
      successCallBack(res);
      const response = {
        status: true,
        value: "Congratulations! Room Book Request has been approved",
      };
      dispatch({
        type: UPDATE_COMPLAINT,
        payload: response,
      });
    })
    .catch((err) => {
      errCallBack(err);
      const response = {
        value:
          "Sorry! There has been an error in confirmings Book Request. Please try again!",
        status: false,
      };
    });
};
