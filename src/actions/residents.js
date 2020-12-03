import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const addResident = (data, url, successCallBack, errCallBack) => {
  let headers = {
    'Content-Type': 'application/json',
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

export const getResidents = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        successCallBack(response)
        dispatch({
          type: 'GET_RESIDENTS',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}
