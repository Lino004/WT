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
      'updateTableClient'
    ]),
    getBillet () {
      firebase.database().ref('billets/').on('value', (snap) => {
        if (snap.val()) {
          const data = Object.values(snap.val())
          this.updateTableBillet(data)
        } else {
          const data = []
          this.updateTableBillet(data)
        }
      })
    },
    getClient () {
      firebase.database().ref('clients/').on('value', (snap) => {
        if (snap.val()) {
          const data = Object.values(snap.val())
          this.updateTableClient(data)
        } else {
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
    firebase.database().ref('billets/').off()
    firebase.database().ref('clients/').off()
  }
}
</script>
