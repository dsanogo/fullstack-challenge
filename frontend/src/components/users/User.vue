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
};
</script>

<style scoped></style>
