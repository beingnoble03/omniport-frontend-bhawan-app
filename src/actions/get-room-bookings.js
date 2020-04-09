import axios from "axios";

export const getRoomBookings = (residence) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `/api/bhawan_app/${residence}/room_booking/`,
    })
      .then((response) => {
        let item = response.data;
        dispatch({
          type: "GET_ALL_ROOM_BOOKINGS",
          payload: item,
        });
      })
      .catch((error) => {});
  };
};
