import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const resolveComplaint = (id, residence, successCallBack, errCallBack) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

  return dispatch => {
    axios
      .patch(`/api/bhawan_app/${residence}/complaint/${id}`, { headers: headers })
      .then(res => {
        successCallBack(res)
        const response = {
          status: true,
          value:
            'Congratulations! The complain has been resolved succesfully.'
        }
        dispatch({
          type: "RESOLVE_COMPLAINT",
          payload: res.data,
        })
      })
      .catch(err => {
        errCallBack(err);
      }
    )
  }
}
