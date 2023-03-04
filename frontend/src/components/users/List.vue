<template>
  <v-card class="mt-5 mb-8">
    <v-card-text>
      <v-container>
        <v-toolbar dark class="mb-2">
          <v-toolbar-title
            ><h3>
              Users List <span v-if="!loading">({{ users.length }})</span>
            </h3>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon title="Refresh" @click="fetchData">
            <v-icon icon="mdi-refresh"></v-icon>
          </v-btn>
        </v-toolbar>
        <v-dialog v-model="dialog" width="auto">
          <v-card class="weather-card-lg">
            <template v-if="selectedUser">
              <v-card-title>
                <h4 class="card-title">{{ selectedUser.name }}</h4>
              </v-card-title>
              <v-card-text>
                <weather-details :data="selectedUserWeather" is-modal />
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </template>
            <template v-else>
              <v-card-text>
                <h3>Please select a user to view the weather information.</h3>
              </v-card-text>
            </template>
          </v-card>
        </v-dialog>
        <v-row v-if="!loading">
          <template v-if="users.length">
            <v-col cols="4" v-for="user in users" :key="user.id">
              <user-detail :user="user" @userClicked="handleUserWeatherClick" />
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12" class="text-center">
              <h4>NO USER FOUND.</h4>
            </v-col>
          </template>
        </v-row>
        <v-row v-else no-gutters>
          <v-col cols="12" class="text-center"> Loading... </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import WeatherDetails from "@/components/weathers/WeatherDetails.vue";
import UserDetail from "@/components/users/User.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UsersList",
  components: { UserDetail, WeatherDetails },
  data() {
    return {
      dialog: false,
      selectedUser: null,
      selectedUserWeather: null,
    };
  },
  computed: {
    ...mapGetters(["users", "loading"]),
  },

  methods: {
    ...mapActions(["fetchUsers"]),
    fetchData() {
      this.fetchUsers();
    },
    handleUserWeatherClick(data) {
      const { user, userWeatherData } = data;
      this.selectedUser = user;
      this.selectedUserWeather = userWeatherData;
      this.dialog = true;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
