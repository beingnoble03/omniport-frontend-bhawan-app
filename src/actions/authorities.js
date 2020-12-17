import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const getAllAuthorities = (residence, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/api/bhawan_app/${residence}/admin/`
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_ALL_AUTHORITIES',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}

export const addAuthority = (data, url, successCallBack, errCallBack) => {
  const headers = {
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

export const editAuthority = (data, url, successCallBack, errCallBack) => {
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
