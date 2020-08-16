<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title><h1 class="font-weight-light">Dashboard</h1></v-toolbar-title>
      </div>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center" class="height-100 grey lighten-5">
              <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{ nFirst }}</v-card>
              <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{ nSecond }}</v-card>
              <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{ nThird }}</v-card>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row align="start" justify="center" class="grey lighten-5">
              <v-card class="ma-3 pa-5 wbuuid text-center" outlined tile>{{ uuid }}</v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      nFirst: 17,
      nSecond: 5,
      nThird: 247,
      uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    }
  }
}
</script>

<style>
  .height-100 {
    height: 100px;
  }
  .wbn {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
  }
  .wbuuid {
    width: 350px;
    min-width: 350px;
    max-width: 350px;
  }
</style>
