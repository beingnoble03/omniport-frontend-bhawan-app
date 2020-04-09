import axios from 'axios'

export const whoami = (successCallBack, errCallBack) => {
  return dispatch => {
    axios.get('/api/bhawan_app/personal_info')
      .then(response => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'WHO_AM_I',
          payload: item
        })
      })
      .catch(error => {
        errCallBack(error)
      })
  }
}
