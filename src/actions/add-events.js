import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const addEvent = (data, successCallBack, errCallBack) => {
  let headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

    axios
      .post('/api/bhawan_app/event/rkb/', data, { headers: headers })
      .then(res => {
        successCallBack(res)
        const response = {
          status: true,
          value:
            'Congratulations! Your event has been added succesfully.'
        }
        dispatch({
          type: "ADD_EVENT",
          payload: response
        })
      })
      .catch(err => {
        errCallBack(err);
        const response = {
          value: 'Sorry! There has been an error in creating your event. Please try again!',
          status: false
        };
      }
    )
}
