<template>
  <div>
    <b-modal
      id="modal-annule-billet"
      centered
      title="Annulation d'un billet"
      ok-title="Effectuer"
      cancel-title="Annuler"
      cancel-variant="danger"
      @ok="annuleBillet"
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
  name: 'AnnuleBillet',
  props: ['id'],
  data: () => ({}),
  computed: {},
  methods: {
    async annuleBillet () {
      try {
        await firebase.database().ref(`${baseRef.billet}/`).child(this.id).update({
          status: 'annulé'
        })
        this.$notify('success', '', 'Billet annulé', { duration: 3000, permanent: false })
      } catch (error) {
        this.$notify('error', 'Erreur:', error, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>

<style>

</style>
