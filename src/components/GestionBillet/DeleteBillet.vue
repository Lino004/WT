<template>
  <div>
    <b-modal
      id="modal-delete-billet"
      centered
      title="Suppression d'un billet"
      ok-title="Supprimer"
      cancel-title="Annuler"
      cancel-variant="danger"
      @ok="deleteBillet"
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

export default {
  name: 'DeleteBillet',
  props: ['id'],
  data: () => ({}),
  computed: {},
  methods: {
    async deleteBillet () {
      try {
        await firebase.database().ref('billets/' + this.id).remove()
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
