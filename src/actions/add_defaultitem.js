import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'
import { toast } from 'react-semantic-toasts'

export const addDefaultItem = (data, residence, successCallBack, errCallBack) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

  return (dispatch) => {
    axios
      .post(`/api/bhawan_app/${residence}/default_item/`, data, {
        headers: headers
      })
      .then((res) => {
        toast({
          type: 'success',
          title: 'Item created Succesfully',
          description: 'Item added succesfully',
          animation: 'fade up',
          icon: 'smile outline',
          time: 4000
        })
        console.log(res)
        successCallBack(res)
        const response = {
          status: true,
          value: 'Congratulations! Your Item has been added succesfully.',
        }
        dispatch({
          type: 'ADD_DEFAULT_ITEM',
          payload: res.data
        })
      })
      .catch((err) => {
        console.log("btr")
        toast({
          type: 'error',
          title: 'Item could not be created',
          description: 'Some error occured or Item already exists',
          animation: 'fade up',
          icon: 'frown outline',
          time: 4000
        })
        errCallBack(err)
      })
  }
}
