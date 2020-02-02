import axios from 'axios'

import { getCookie } from 'formula_one/src/utils'

export const addComplaint = data => {
  let headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }

    axios
      .post('/api/bhawan_app/hostel_complaint/rkb/', data, { headers: headers })
      .then(res => {
        const response = {
          status: true,
          value:
            'Congratulations! Your complain has been made succesfully.'
        }
        // dispatch({
        //   type: ADD_COMPLAINT,
        //   payload: response
        // })
      })
      .catch(err => {
        const response = {
          value: 'Sorry! There has been an error in making your complain. Please try again!',
          status: false
        };
      }
    )
  
}
