import axios from 'axios'

export const getComplains = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_ALL_COMPLAINS',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}
export const getPendingComplains = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_PENDING_COMPLAINS',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}
export const getResolvedComplains = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_RESOLVED_COMPLAINS',
          payload: item
        })
      })
      .catch((err)=> {
        errCallBack(err)
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
