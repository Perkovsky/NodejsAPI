<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" class="height-100 grey lighten-5">
          <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{nFirst}}</v-card>
          <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{nSecond}}</v-card>
          <v-card class="ma-3 pa-6 wbn text-center" outlined tile>{{nThird}}</v-card>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="start" justify="center" class="grey lighten-5">
          <v-card class="ma-3 pa-5 wbuuid text-center" outlined tile>{{uuid}}</v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
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
