import axios from 'axios'

export const getFacility = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/api/bhawan_app/hostel_facility/rkb',
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
