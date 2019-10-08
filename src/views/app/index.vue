<template>
  <div id="app-container" class="menu-sub-hidden" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
      </div>
    </main>
  </div>
</template>
<script>
import Sidebar from '@/containers/Sidebar'
import TopNav from '@/containers/TopNav'
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'
import { baseRef } from '@/constants/config'

export default {
  data () {
    return { show: false }
  },
  components: {
    TopNav,
    Sidebar
  },
  computed: {
    ...mapGetters(['getMenuType'])
  },
  methods: {
    ...mapActions([
      'updateTableBillet',
      'updateTableClient',
      'updateLoadingBillet',
      'updateLoadingClient'
    ]),
    getBillet () {
      this.updateLoadingBillet(true)
      firebase.database().ref(`${baseRef.billet}/`).on('value', (snap) => {
        if (snap.val()) {
          this.updateLoadingBillet(false)
          const data = Object.values(snap.val())
          this.updateTableBillet(data)
        } else {
          this.updateLoadingBillet(false)
          const data = []
          this.updateTableBillet(data)
        }
      })
    },
    getClient () {
      this.updateLoadingClient(true)
      firebase.database().ref(`${baseRef.client}/`).on('value', (snap) => {
        if (snap.val()) {
          this.updateLoadingClient(false)
          const data = Object.values(snap.val())
          this.updateTableClient(data)
        } else {
          this.updateLoadingClient(false)
          const data = []
          this.updateTableClient(data)
        }
      })
    }
  },
  mounted () {
    this.getBillet()
    this.getClient()
  },
  destroyed () {
    firebase.database().ref(`${baseRef.billet}/`).off()
    firebase.database().ref(`${baseRef.client}/`).off()
  }
}
</script>
