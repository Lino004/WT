<template>
  <div>
    <b-modal
      id="modal-modif-client"
      size="lg"
      centered
      title="Midification d'un client"
      no-close-on-backdrop
      @shown="updateDataModal"
      ref="modal-modif-client">
      <b-form>
        <b-row>

          <b-colxx sm="6">
            <b-form-group label="Nom(s)">
              <b-form-input
                v-model.trim="nom.value"
                :state="nom.state"
                aria-describedby="msg-err-nom"
                placeholder="Nom(s) du client"
                @blur="validNom"/>
              <b-form-invalid-feedback id="msg-err-nom">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Prenom(s)">
              <b-form-input
                v-model.trim="prenom.value"
                :state="prenom.state"
                aria-describedby="msg-err-prenom"
                placeholder="Prenom(s) du client"
                @blur="validPrenom"/>
              <b-form-invalid-feedback id="msg-err-prenom">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>

          <b-colxx sm="6">
            <b-form-group label="Adresse">
              <b-form-input
                v-model.trim="adresse.value"
                :state="adresse.state"
                aria-describedby="msg-err-adresse"
                placeholder="Adresse du client"
                @blur="validAdresse"/>
              <b-form-invalid-feedback id="msg-err-adresse">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Nationalite">
              <vue-bootstrap-typeahead
                v-model.trim="nationalite"
                :data="listeNationalite"
                placeholder="Nationalite du client"
                ref="nationaliteClientModalModif"
              />
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Date de naissance">
              <v-date-picker
                mode="single"
                v-model="dateDeNaissance"
                :input-props="{
                  class:'form-control colorTheme',
                  readonly: true,
                  placeholder: 'Date de naissance'
                }"
              />
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Sexe">
              <b-form-select
                v-model="sexe.value"
                :options="sexe.options"
                :state="sexe.state"
                plain/>
            </b-form-group>
          </b-colxx>

        </b-row>
      </b-form>

      <template slot="modal-footer">
          <b-button variant="danger" @click="hideModal('modal-modif-client')">Annuler</b-button>
          <b-button variant="primary" @click="update('modal-modif-client')" class="mr-1">Enregistrer</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { mapGetters } from 'vuex'
import { baseRef } from '@/constants/config'

moment.locale('fr')

export default {
  name: 'AddClient',
  props: ['data'],
  components: {
    VueBootstrapTypeahead
  },
  data: () => ({
    nom: {
      value: '',
      state: null
    },
    prenom: {
      value: '',
      state: null
    },
    adresse: {
      value: '',
      state: null
    },
    nationalite: '',
    sexe: {
      value: null,
      state: null,
      options: [
        { value: null, text: 'Choisissez un sexe' },
        { value: 'M', text: 'Masculin' },
        { value: 'F', text: 'Féminin' }
      ]
    },
    dateDeNaissance: new Date(),
    idClient: ''
  }),
  computed: {
    ...mapGetters({
      listeNationalite: 'getTableNationalite',
      listeClient: 'getTableClient'
    })
  },
  methods: {
    hideModal (refname) {
      this.$refs[refname].hide()
    },
    validNom () {
      if (this.nom.value) {
        this.nom.state = null
        return true
      }
      this.nom.state = false
      return false
    },
    validPrenom () {
      if (this.prenom.value) {
        this.prenom.state = null
        return true
      }
      this.prenom.state = false
      return false
    },
    validAdresse () {
      if (this.adresse.value) {
        this.adresse.state = null
        return true
      }
      this.adresse.state = false
      return false
    },
    valideClient () {
      return this.validNom() && this.validPrenom() && this.validAdresse() && this.nationalite && this.sexe.value
    },
    updateClient () {
      firebase.database().ref(`${baseRef.client}/`).child(this.idClient).update({
        nom: this.nom.value.toUpperCase(),
        prenom: this.prenom.value.toUpperCase(),
        adresse: this.adresse.value,
        nationalite: this.nationalite,
        dateDeNaissance: moment(this.dateDeNaissance).format('ll'),
        sexe: this.sexe.value,
        date: moment().format('lll')
      })
    },
    updateBillet (id) {
      firebase.database().ref(`${baseRef.billet}/`).child(id).update({
        nom: this.nom.value.toUpperCase(),
        prenom: this.prenom.value.toUpperCase()
      })
    },
    async update (refname) {
      try {
        if (this.valideClient()) {
          this.updateClient()
          const liste = this.listeClient.filter(el => el.idClient === this.idClient)
          if (liste.length) {
            liste.forEach(el => {
              this.updateClient(el.id)
            })
          }
          this.$notify('success', '', 'Donnees enregistree', { duration: 3000, permanent: false })
          this.hideModal(refname)
        } else {
          this.$notify('error', 'Erreur:', 'Verifiez les champs', { duration: 3000, permanent: false })
        }
      } catch (error) {
        this.$notify('error', 'Erreur:', error, { duration: 3000, permanent: false })
      }
    },
    updateDataModal () {
      this.$refs.nationaliteClientModalModif.inputValue = this.data.nationalite
      this.nom.value = this.data.nom
      this.prenom.value = this.data.prenom
      this.adresse.value = this.data.adresse
      this.nationalite = this.data.nationalite
      this.sexe.value = this.data.sexe
      this.dateDeNaissance = new Date(
        moment(this.data.dateDeNaissance, 'll').year(),
        moment(this.data.dateDeNaissance, 'll').month(),
        moment(this.data.dateDeNaissance, 'll').date()
      )
      this.idClient = this.data.id
    }
  }
}
</script>

<style>

</style>
