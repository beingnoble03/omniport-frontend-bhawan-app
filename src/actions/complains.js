import axios from 'axios'

export const getComplains = (url) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        dispatch({
          type: 'GET_ALL_COMPLAINS',
          payload: item
        })
      })
  }
}
export const getPendingComplains = (url) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        dispatch({
          type: 'GET_PENDING_COMPLAINS',
          payload: item
        })
      })
  }
}
export const getResolvedComplains = (url) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        dispatch({
          type: 'GET_RESOLVED_COMPLAINS',
          payload: item
        })
      })
  }
}
export const increaseUnsuccefulAttempts = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
      })
      .catch((error) => {
        errCallBack(error)
      })
  }
}
