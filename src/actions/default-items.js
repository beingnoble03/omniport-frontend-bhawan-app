import axios from 'axios'

export const getDefaultItems = (url) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: url
    })
      .then((response) => {
        let item = response.data
        dispatch({
          type: 'GET_DEFAULT_ITEMS',
          payload: item
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

