import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const addDefaultItem = (data, residence, successCallBack, errCallBack) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

  return (dispatch) => {
    axios
      .post(`/api/bhawan_app/${residence}/default_item/`, data, {
        headers: headers
      })
      .then((res) => {
        successCallBack(res)
        dispatch({
          type: 'ADD_DEFAULT_ITEM',
          payload: res.data
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}
