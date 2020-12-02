import axios from 'axios'

export const searchResident = (url, successCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response.data)
        let item = response.data
        dispatch({
          type: 'SEARCH_RESIDENT',
          payload: item
        })
      })
  }
}
