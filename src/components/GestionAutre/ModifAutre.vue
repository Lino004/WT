<template>
  <div>
    <b-modal
      id="modal-modif-autre"
      size="lg"
      centered
      title="Midification d'un autre"
      no-close-on-backdrop
      @shown="updateDataModal"
      ref="modal-modif-autre">
      <b-form>
        <b-row>

          <b-colxx sm="6">
            <b-form-group label="Type">
              <b-form-select
                v-model.lazy="type.value"
                :options="type.options"
                plain/>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Montant">
              <b-form-input
                type="number"
                v-model="montant"
                placeholder="Entrez le montant"/>
            </b-form-group>
          </b-colxx>

        </b-row>
      </b-form>

      <template slot="modal-footer">
          <b-button variant="danger" @click="hideModal('modal-modif-autre')">Annuler</b-button>
          <b-button variant="primary" @click="update('modal-modif-autre')" class="mr-1">Enregistrer</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
import { baseRef } from '@/constants/config'

moment.locale('fr')

export default {
  name: 'AddAutre',
  props: ['data'],
  components: {},
  data: () => ({
    montant: 0,
    type: {
      value: null,
      options: [
        { value: null, text: 'Choisissez un type' },
        { value: 'Reservation', text: 'Reservation' },
        { value: 'Location', text: 'Location' }
      ]
    },
    idAutre: ''
  }),
  computed: {},
  methods: {
    hideModal (refname) {
      this.$refs[refname].hide()
    },
    update (refname) {
      if (this.montant && this.type.value) {
        firebase.database().ref(`${baseRef.autre}/`).child(this.idAutre).update({
          montant: this.montant,
          type: this.type.value
        })
        this.$notify('success', '', 'Donnees enregistree', { duration: 3000, permanent: false })
        this.hideModal(refname)
      } else {
        this.$notify('error', 'Erreur:', 'Verifiez les champs', { duration: 3000, permanent: false })
      }
    },
    updateDataModal () {
      this.montant = this.data.montant
      this.type.value = this.data.type
      this.idAutre = this.data.id
    }
  }
}
</script>

<style>

</style>
