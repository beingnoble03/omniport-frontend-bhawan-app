import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const bookRoom = (data, residence, successCallBack, errCallBack) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return (dispatch) => {
    axios
      .post(`/api/bhawan_app/${residence}/room_booking/`, data, {
        headers: headers
      })
      .then((res) => {
        successCallBack(res)
        dispatch({
          type: 'ADD_BOOKING',
          payload: res
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}
export const updateBooking = (
  url,
  data,
  successCallBack,
  errCallBack
) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return (dispatch) => {
    axios
      .patch(url, data, {
        headers: headers
      })
      .then((res) => {
        successCallBack(res)
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}
