import { createStore } from "vuex";
import Users from "@/apis/users";

const store = createStore({
  state: {
    users: [],
    user: null,
    sampleWeatherData: {
      coord: {
        lon: -2.15,
        lat: 57,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      base: "stations",
      main: {
        temp: 8.48,
        feels_like: 4.9,
        temp_min: 8.18,
        temp_max: 9.26,
        pressure: 1016,
        humidity: 79,
        sea_level: 1016,
        grnd_level: 1016,
      },
      visibility: 10000,
      wind: {
        speed: 7.3,
        deg: 189,
        gust: 13.48,
      },
      clouds: {
        all: 100,
      },
      dt: 1647347424,
      sys: {
        type: 2,
        id: 2031790,
        country: "GB",
        sunrise: 1647325488,
        sunset: 1647367827,
      },
      timezone: 0,
      id: 2641549,
      name: "Newtonhill",
      cod: 200,
    },
  },
  getters: {
    users: (state) => state.users,
    user: (state) => state.user,
    sample_weather_data: (state) => state.sampleWeatherData,
  },
  mutations: {
    SET_USERS: (state, payload) => {
      state.users = payload;
    },

    SET_USER: (state, payload) => {
      state.user = payload;
    },
  },
  actions: {
    fetchUsers: ({ commit }) => {
      return new Promise((resolve, reject) => {
        Users.all()
          .then((res) => {
            commit("SET_USERS", res.data.data);
            resolve(resolve);
          })
          .catch((err) => reject(err));
      });
    },

    getUser: ({ commit }, userId) => {
      Users.get(userId).then((res) => {
        commit("SET_USER", res.data.data);
      });
    },

    storeUserWeatherData: (__, request) => {
      const { userId, data } = request;
      Users.storeWeatherData(userId, data);
    },
  },
});

export default store;
