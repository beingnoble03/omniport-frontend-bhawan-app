import axios from "axios";

export const getComplains = ( url) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        let item = response.data;
        dispatch({
          type: "GET_ALL_COMPLAINS",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};
export const getPendingComplains = (url) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        let item = response.data;
        dispatch({
          type: "GET_PENDING_COMPLAINS",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};
export const getResolvedComplains = (url) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        let item = response.data;
        dispatch({
          type: "GET_RESOLVED_COMPLAINS",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};
export const increaseUnsuccefulAttempts = (url) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        let item = response.data;
        dispatch({
          type: "GET_RESOLVED_COMPLAINS",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};

