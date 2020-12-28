import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'
import { toast } from 'react-semantic-toasts'

export const addEvent = (data, url, successCallBack, errCallBack) => {
  let headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return (dispatch) => {
    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        toast({
          type: 'success',
          title: 'Event created Succesfully',
          description: 'Event added succesfully',
          animation: 'fade up',
          icon: 'smile outline',
          time: 4000
        })
        successCallBack(res)
        const response = {
          status: true,
          value: 'Congratulations! Your event has been added succesfully.',
        }
        dispatch({
          type: 'ADD_EVENT',
          payload: res.data
        })
      })
      .catch((err) => {
        toast({
          type: 'failure',
          title: 'Event could not be created',
          description: 'There were errors with your submission',
          animation: 'fade up',
          icon: 'frown outline',
          time: 4000
        })
        errCallBack(err)
      })
  }
}
