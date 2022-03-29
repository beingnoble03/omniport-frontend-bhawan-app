import axios from 'axios'

export const getItems = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_ALL_ITEMS',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}

