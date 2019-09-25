<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card rounded_sm" no-body>
          <div class="position-relative image-side"></div>
          <div class="form-side">
            <router-link tag="a" to="/"><h2 class="my-3 text-center h3">Connexion</h2></router-link>
            <b-form @submit.prevent="formSubmit">
              <label class="form-group has-float-label mb-4">
                <input type="email" class="form-control" v-model="email">
                <span>Entrez votre email</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="password">
                <span>Entrez votre mot de passe</span>
              </label>
              <div class="d-flex justify-content-between align-items-center">
                  <router-link tag="a" to="/user/forgot-password">Mot de passe oublié?</router-link>
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow" :disabled="processing">Se connecter</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    ...mapActions(['login']),
    formSubmit () {
      this.login({ email: this.email, password: this.password })
    }
  },
  watch: {
    currentUser (val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push('/')
        }, 500)
      }
    },
    loginError (val) {
      if (val != null) {
        this.$notify('error', 'Login Error', val, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>
