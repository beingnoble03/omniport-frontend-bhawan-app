import axios from 'axios'

export const getAllAuthorities = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/api/bhawan_app/contact/rkb',
    })
      .then(response => {
        let item = response.data.results
        dispatch({
          type: 'GET_ALL_AUTHORITIES',
          payload: item
        })
      })
      .catch(error => {})
  }
}
