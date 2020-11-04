import axios from 'axios'

export const getRoomBookings = (url) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        dispatch({
          type: 'GET_ALL_ROOM_BOOKINGS',
          payload: item
        })
      })
  }
}

export const getPresentRoomBookings = (url) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        dispatch({
          type: 'GET_PRESENT_ROOM_BOOKINGS',
          payload: item
        })
      })
  }
}

export const getPastRoomBookings = (url) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        dispatch({
          type: 'GET_PAST_ROOM_BOOKINGS',
          payload: item
        })
      })
  }
}
