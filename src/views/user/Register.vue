<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side "></div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
               <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="fullname">
                <span>{{ $t('user.fullname') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="status">
                <span> Status </span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="email" class="form-control" v-model="email">
                <span>{{ $t('user.email') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="password">
                <span>{{ $t('user.password') }}</span>
              </label>
              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { baseRef } from '@/constants/config'

export default {
  data () {
    return {
      fullname: '',
      email: '',
      status: '',
      password: ''
    }
  },
  methods: {
    formSubmit () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
        firebase.database().ref(`${baseRef.user}/${user.user.uid}`).set({
          id: user.user.uid,
          fullname: this.fullname,
          email: this.email,
          status: this.status
        })
      })
    }
  }
}
</script>
