import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const addComplaint = (data, residence, successCallBack, errCallBack) => {
  let headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

  return dispatch => {
    axios
      .post(`/api/bhawan_app/${residence}/complaint/`, data, { headers: headers })
      .then(res => {
        successCallBack(res)
        const response = {
          status: true,
          value:
            'Congratulations! Your complain has been made succesfully.'
        }
        dispatch({
          type: "ADD_COMPLAINT",
          payload: res.data,
        })
      })
      .catch(err => {
        errCallBack(err);
      }
    )
  }
}
