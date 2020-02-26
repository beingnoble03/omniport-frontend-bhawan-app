import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const bookRoom = (data, successCallBack, errCallBack) => {
  let headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

    axios
      .post('/api/bhawan_app/room_booking/rkb/', data, { headers: headers })
      .then(res => {
        successCallBack(res)
        const response = {
          status: true,
          value:
            'Congratulations! Your Room Book Request has been made succesfully.'
        }
        dispatch({
          type: ADD_COMPLAINT,
          payload: response
        })
      })
      .catch(err => {
        errCallBack(err);
        const response = {
          value: 'Sorry! There has been an error in making your Book Request. Please try again!',
          status: false
        };
      }
    )
}
