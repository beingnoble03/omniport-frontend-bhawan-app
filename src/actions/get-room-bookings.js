import axios from 'axios'

export const getRoomBookings = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_ALL_ROOM_BOOKINGS',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}

export const getPresentRoomBookings = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_PRESENT_ROOM_BOOKINGS',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}

export const getPastRoomBookings = (url, successCallBack, errCallBack) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'GET_PAST_ROOM_BOOKINGS',
          payload: item
        })
      })
      .catch((err) => {
        errCallBack(err)
      })
  }
}
