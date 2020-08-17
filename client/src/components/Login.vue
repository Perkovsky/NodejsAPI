<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-12">
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text">Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules" 
                prepend-icon="mdi-email"
                name="email" 
                label="Email" 
                type="email"
                required>
              </v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="6" 
                prepend-icon="mdi-lock" 
                name="password"
                label="Password" 
                type="password"
                required
                @keyup.enter="onSubmit">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              text
              :loading="loading"
              :disabled="!valid || loading"
              @click="onLogin"
              >Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must be equal or more than 6 characters'
        ]
      }
    },
    methods: {
      async onLogin () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }
          await this.$store.dispatch('login', user)
          this.$router.push('/')
        }
      }
    }, 
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
