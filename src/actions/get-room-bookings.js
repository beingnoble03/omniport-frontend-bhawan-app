import axios from 'axios'

export const getRoomBookings = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/api/bhawan_app/room_booking/rkb/',
    })
      .then(response => {
        let item = response.data
        dispatch({
          type: 'GET_ALL_ROOM_BOOKINGS',
          payload: item
        })
      })
      .catch(error => {})
  }
}
