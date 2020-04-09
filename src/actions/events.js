import axios from 'axios'

export const getEvents = (residence) => {
  console.log("hjbjh")
  return dispatch => {
    axios({
      method: 'get',
      url: `/api/bhawan_app/${residence}/event/`,
    })
      .then(response => {
        console.log("iurt")
        console.log(response)
        let item = response.data.results
        dispatch({
          type: 'GET_ALL_EVENTS',
          payload: item
        })
      })
      .catch(error => {console.log("jnk")})
  }
}
