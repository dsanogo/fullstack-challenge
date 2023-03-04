<template>
  <v-card class="pa-2 weather-card" outlined tile>
    <v-card-title @click="$emit('userClicked', { user, userWeatherData })">
      <h4 class="card-title">{{ user.name }}</h4>
    </v-card-title>
    <v-card-text>
      <template v-if="userWeatherData">
        <weather-details :data="userWeatherData" />
      </template>
      <template v-else>No data found.</template>
    </v-card-text>
  </v-card>
</template>

<script>
import WeatherDetails from "@/components/weathers/WeatherDetails.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserDetail",
  data() {
    return {
      userWeatherData: null,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  components: { WeatherDetails },

  computed: {
    ...mapGetters(["sample_weather_data"]),
  },
  methods: {
    ...mapActions(["storeUserWeatherData", "getUserWeatherDataFromAPI"]),
    getWeatherData() {
      const { weather } = this.user;

      if (!weather) {
        this.resetWeatherData();
      } else {
        // check if the weather data is not more than 1 hour
        if (weather.expires_in <= 0) {
          this.resetWeatherData();
        } else {
          this.userWeatherData = weather;
          this.trackWeatherUpdate(weather);
        }
      }
    },

    trackWeatherUpdate(weather) {
      setInterval(() => {
        this.resetWeatherData();
      }, Number(weather.expires_in) * 60000);
    },

    resetWeatherData() {
      const { weather } = this.user;
      this.getUserWeatherDataFromAPI(this.user)
        .then((res) => {
          this.userWeatherData = res.data;
          console.log(this.userWeatherData);
          this.handleStoreUserWeatherData(this.userWeatherData);
          this.userWeatherData.expires_in = 60;
          this.trackWeatherUpdate(this.userWeatherData);
        })
        .catch(() => {
          this.userWeatherData = weather ?? this.sample_weather_data;
        });
    },

    handleStoreUserWeatherData(data) {
      const _request = {
        userId: this.user.id,
        data,
      };
      this.storeUserWeatherData(_request);
    },
  },

  mounted() {
    this.getWeatherData();
  },
};
</script>

<style scoped></style>
