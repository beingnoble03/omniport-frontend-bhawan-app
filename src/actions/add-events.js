import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const addEvent = (data, successCallBack, errCallBack) => {
  let headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

  return dispatch => {
    axios
      .post(`/api/bhawan_app/rkb/event/`, data, { headers: headers })
      .then(res => {
        successCallBack(res)
        const response = {
          status: true,
          value:
            'Congratulations! Your event has been added succesfully.'
        }
        console.log("actions")
        console.log(res.data)
        dispatch({
          type: "ADD_EVENT",
          payload: res.data,
        })
      })
      .catch(err => {
        errCallBack(err);
      }
    )
  }
}
