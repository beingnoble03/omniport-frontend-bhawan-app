import axios from "axios";

export const searchPerson = (url, successCallBack) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        successCallBack(response);
        let item = response.data;
        dispatch({
          type: "SEARCH_PERSON_RESULTS",
          payload: item,
        });
      })
      .catch((error) => {
      });
  };
};
