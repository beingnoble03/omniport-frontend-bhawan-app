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
      .catch((err) => {
      });
  };
};

export const changeTimeSlot = (
  data,
  prevData,
  residence,
  successCallBack,
  errorCallBack
) => {
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  };
  const found = search(prevData, data.complaintType, data.timing.day);
  if (!found) {
    return (dispatch) => {
      axios
        .post(`/api/bhawan_app/${residence}/time_slot/`, data, {
          headers: headers,
        })
        .then((res) => {
        })
        .catch((err) => {
        });
    };
  } else {
    return (dispatch) => {
      axios
        .patch(`/api/bhawan_app/${residence}/time_slot/${found.id}/`, data, {
          headers: headers,
        })
        .then((res) => {
        })
        .catch((err) => {
        });
    };
  }
};

function search(source, complaintType, day) {
  let index;
  let entry;

  for (index = 0; index < source.length; ++index) {
    entry = source[index];
    if (
      entry &&
      entry.complaintType &&
      entry.complaintType === complaintType &&
      entry.timing[0].day === day
    ) {
      return entry;
    }
  }

  return false;
}
