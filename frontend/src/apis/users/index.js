import axios from "axios";

const apiUrl = "http://localhost/users";
export default {
  all: () => {
    return axios.get(apiUrl);
  },

  get: (userId) => {
    return axios.get(`${apiUrl}/${userId}`);
  },

  storeWeatherData: (userId, data) => {
    return axios.post(`${apiUrl}/${userId}/weather`, { data });
  },
};
