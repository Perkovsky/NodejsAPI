<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" class="height-100 grey lighten-5">
          <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{dashboard.c1}}</v-card>
          <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{dashboard.c2}}</v-card>
          <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{dashboard.c3}}</v-card>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="start" justify="center" class="grey lighten-5">
          <v-card class="ma-3 pa-5 wbuuid text-center" outlined tile>{{dashboard.uuid}}</v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    dashboard () {
      return this.$store.getters.dashboard
    },
  }
}
</script>
