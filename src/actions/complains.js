import axios from 'axios'

export const getComplains = (residence) => {
  return dispatch => {
    axios({
      method: 'get',
      url: `/api/bhawan_app/${residence}/complaint/`,
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