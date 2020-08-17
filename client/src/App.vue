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
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="isUserAuthorized">
        <template v-slot:activator="{ on, attrs }">
           <v-icon icon dark v-bind="attrs" v-on="on" @click="onLogout">mdi-logout</v-icon>
        </template>
        <span>Logout from {{user.name}}</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <template v-if="error">
      <v-snackbar
        color="error"
        :multi-line="true"
        :timeout="5000"
        :value="true"
        @input="closeError"
        >{{error}}
        <v-btn
          dark
          text
          @click.native="closeError"
        >Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }, 
  computed: {
    error () {
      return this.$store.getters.error
    },
    user () {
      return this.$store.getters.user
    },
    isUserAuthorized () {
      return this.user !== null
    },
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
