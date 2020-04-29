import axios from "axios";

export const getAllAuthorities = (residence) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `/api/bhawan_app/${residence}/admin/`,
    })
      .then((response) => {
        let item = response.data.results;
        dispatch({
          type: "GET_ALL_AUTHORITIES",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};

export const addAuthority = (data, url, successCallBack, errCallBack) => {
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  };

  return (dispatch) => {
    axios
      .post(url, data, {
        headers: headers,
      })
      .then((res) => {
        successCallBack(res);
      })
      .catch((err) => {
        errCallBack(err);
      });
  };
};