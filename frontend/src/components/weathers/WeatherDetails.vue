<template>
  <v-row v-if="weatherInfo">
    <v-col cols="12">
      <h4>{{ weatherDataInfo }}</h4>
    </v-col>
    <v-col cols="3" class="text-center">
      <v-img
        width="100"
        :src="`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`"
      ></v-img>
    </v-col>
    <v-col cols="9">
      <p>
        <strong>Temperature: {{ data.main.temp }}°C</strong>
      </p>
      <p>
        <strong>Min: {{ data.main.temp_min }}°C <br /></strong>
        <strong>Max: {{ data.main.temp_max }}°C</strong>
      </p>
      <p class="text-uppercase">{{ weatherInfo.main }}</p>
      <p class="text-uppercase">{{ weatherInfo.description }}</p>
    </v-col>
    <template v-if="isModal">
      <v-col cols="3" class="text-center text-uppercase font-weight-bold">
        <p>Feels like: <br />{{ data.main.feels_like }}°C</p>
      </v-col>
      <v-col cols="3" class="text-center text-uppercase font-weight-bold">
        <p>
          humidity: <br />
          {{ data.main.humidity }}°C
        </p>
      </v-col>
      <v-col cols="3" class="text-center text-uppercase font-weight-bold">
        <p>pressure: <br />{{ data.main.pressure }}°C</p>
      </v-col>
      <v-col cols="3" class="text-center text-uppercase font-weight-bold">
        <p>wind speed: <br />{{ data.wind.speed }} MPH</p>
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  name: "WeatherDetails",
  props: {
    data: {
      type: Object,
      default: null,
    },
    isModal: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    weatherInfo() {
      return this.data ? this.data.weather[0] : null;
    },

    weatherDataInfo() {
      return this.data.name !== "" && this.data.name !== null
        ? this.data.name
        : "Weather Info";
    },
  },
};
</script>

<style scoped></style>
