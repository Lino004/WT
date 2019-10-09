<template>
  <div>
    <b-modal
      id="modal-delete-autre"
      centered
      title="Suppression d'un autre"
      ok-title="Supprimer"
      cancel-title="Annuler"
      cancel-variant="danger"
      @ok="deleteAutre"
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
  name: 'DeleteAutre',
  props: ['id'],
  data: () => ({}),
  computed: {},
  methods: {
    async deleteAutre () {
      try {
        await firebase.database().ref(`${baseRef.autre}/${this.id}`).remove()
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
