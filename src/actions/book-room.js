import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const bookRoom = (data, successCallBack, errCallBack) => {
  console.log("wec")
      for (var value of data.values()) {
        console.log(value);
     }
  const headers = {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .post('/api/bhawan_app/rkb/room_booking/', data, { headers: headers })
      .then(res => {
        console.log(res)
        successCallBack(res)
        const response = {
          status: true,
          value:
            'Congratulations! Your Room Book Request has been made succesfully.'
        }
        dispatch({
          type: "ADD_BOOKING",
          payload: res
        })
      })
      .catch(err => {
        console.log(err)
        errCallBack(err);
        const response = {
          value: 'Sorry! There has been an error in making your Book Request. Please try again!',
          status: false
        };
      }
    )
  }
}
export const updateBooking = (id, data, residence, successCallBack, errCallBack) => {
  console.log("vfhg")
  console.log(data)
  console.log(id+" "+residence)
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .patch(`/api/bhawan_app/${residence}/room_booking/${id}/`, data, { headers: headers })
      .then(res => {
        successCallBack(res)
        const response = {
          status: true,
          value:
            'Congratulations! The room booking status has changes succesfully made succesfully.'
        }
        dispatch({
          type: "UPADTE_BOOKING",
          payload: response
        })
      })
      .catch(err => {
        errCallBack(err);
        const response = {
          value: 'Sorry! There has been an error in making your Book Request. Please try again!',
          status: false
        };
      }
    )
  }
}