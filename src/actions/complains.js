import axios from 'axios'

export const getComplains = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/api/bhawan_app/hostel_complaint/rkb',
    })
      .then(response => {
        let item = response.data.results
        dispatch({
          type: 'GET_ALL_COMPLAINS',
          payload: item
        })
      })
      .catch(error => {})
  }
}
