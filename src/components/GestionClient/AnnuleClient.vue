<template>
  <div>
    <b-modal
      id="modal-annule-client"
      centered
      title="Annulation d'un client"
      ok-title="Effectuer"
      cancel-title="Annuler"
      cancel-variant="danger"
      @ok="annuleClient"
      no-close-on-backdrop>
      <p>
        Etes vous sur de vouloir annuler cette donnée?
      </p>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import { baseRef } from '@/constants/config'

export default {
  name: 'AnnuleClient',
  props: ['id'],
  data: () => ({}),
  computed: {},
  methods: {
    async annuleClient () {
      try {
        await firebase.database().ref(`${baseRef.client}/`).child(this.id).update({
          status: 'annulé'
        })
        this.$notify('success', '', 'Client annulé', { duration: 3000, permanent: false })
      } catch (error) {
        this.$notify('error', 'Erreur:', error, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>

<style>

</style>
