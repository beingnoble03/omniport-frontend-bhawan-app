import axios from 'axios'

export const getFacilities = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/api/bhawan_app/facility/rkb',
    })
      .then(response => {
        let item = response.data.results
        dispatch({
          type: 'GET_FACILITY',
          payload: item
        })
      })
      .catch(error => {})
  }
}
