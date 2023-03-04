import axios from "axios";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = "e5aaa9d68cf68bff34e50afee199bb57";

export default {
  getWeatherData: (user) => {
    const { latitude, longitude } = user;
    return axios.get(
      `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric}`
    );
  },
};
