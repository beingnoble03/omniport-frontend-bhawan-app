import axios from 'axios'

export const getEvents = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/api/bhawan_app/rkb/event/',
    })
      .then(response => {
        let item = response.data.results
        dispatch({
          type: 'GET_ALL_EVENTS',
          payload: item
        })
      })
      .catch(error => {})
  }
}
