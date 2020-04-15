import axios from "axios";

export const getEvents = (url) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        let item = response.data.results;
        dispatch({
          type: "GET_ALL_EVENTS",
          payload: item,
        });
      })
      .catch((error) => {
      });
  };
};
