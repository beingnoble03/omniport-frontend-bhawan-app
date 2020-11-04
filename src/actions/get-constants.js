import axios from 'axios'

export const getConstants = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_ALL_CONSTANTS',
          payload: item
        })
      })
      .catch((error) => {
        errCallBack(error)
      })
  }
}
