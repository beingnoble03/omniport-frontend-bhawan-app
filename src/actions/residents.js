import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const addResident = (data, url, successCallBack, errCallBack) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return (dispatch) => {
    axios
      .post(url, data, {
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