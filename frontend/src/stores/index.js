import { createStore } from "vuex";
import Users from "@/apis/users";
import OpenWeatherMap from "@/apis/openweathermap";

const store = createStore({
  state: {
    loading: false,
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
    loading: (state) => state.loading,
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

    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    fetchUsers: ({ commit }) => {
      commit("SET_LOADING", true);
      Users.all().then((res) => {
        commit("SET_USERS", res.data.data);
        commit("SET_LOADING", false);
      });
    },

    getUser: ({ commit }, userId) => {
      commit("SET_LOADING", true);
      Users.get(userId).then((res) => {
        commit("SET_USER", res.data.data);
        commit("SET_LOADING", false);
      });
    },

    getUserWeatherDataFromAPI: (__, user) => {
      return new Promise((resolve, reject) => {
        OpenWeatherMap.getWeatherData(user)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },

    storeUserWeatherData: (__, request) => {
      const { userId, data } = request;
      Users.storeWeatherData(userId, data);
    },
  },
});

export default store;
