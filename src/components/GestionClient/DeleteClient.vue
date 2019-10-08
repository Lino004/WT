<template>
  <div>
    <b-modal
      id="modal-delete-client"
      centered
      title="Suppression d'un client"
      ok-title="Supprimer"
      cancel-title="Annuler"
      cancel-variant="danger"
      @ok="deleteClient"
      no-close-on-backdrop>
      <p>
        Etes vous sur de vouloir supprimer cette donnée?
      </p>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import { baseRef } from '@/constants/config'

export default {
  name: 'DeleteClient',
  props: ['id'],
  data: () => ({}),
  computed: {},
  methods: {
    async deleteClient () {
      try {
        await firebase.database().ref(`${baseRef.client}/${this.id}`).remove()
        this.$notify('success', '', 'Donnée supprimée', { duration: 3000, permanent: false })
      } catch (error) {
        this.$notify('error', 'Erreur:', error, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>

<style>

</style>
