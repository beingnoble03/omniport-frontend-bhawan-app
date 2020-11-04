import axios from 'axios'

import { whoAmIUrl } from '../urls'

export const whoami = (successCallBack, errCallBack) => {
  return (dispatch) => {
    axios
      .get(whoAmIUrl())
      .then((response) => {
        successCallBack(response)
        let item = response.data
        dispatch({
          type: 'WHO_AM_I',
          payload: item
        })
      })
      .catch((error) => {
        errCallBack(error)
      })
  }
}
