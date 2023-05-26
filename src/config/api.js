import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  // Disable this for dev local
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_BE,
  },
});

// export const setAuthToken = (token) => {
//   if (token) {
//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete API.defaults.headers.common["Authorization"];
//   }
// };

export const handleError = (err) => {
  if (err.response) {
    console.error(err.response?.data);
    console.error(err.response?.data?.message);
    console.error(err.response?.status);
  }
  if (err.response?.status === 401) {
    if (!err.response.data.err) return;
    alert(err.response.data.err);
  }
  if (err.response === 404) {
    console.info("page not found");
  } else if (err.request) {
    console.error(err.request);
    console.error(err.massage);
  }
};
