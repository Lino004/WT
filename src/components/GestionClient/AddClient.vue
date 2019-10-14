<template>
  <div>
    <a v-b-modal.modal-add-client class="text-primary cursor"><i class="iconsminds-add h1"></i></a>
    <b-modal
      id="modal-add-client"
      size="lg"
      centered
      title="Enregistrement d'un client"
      no-close-on-backdrop
      @hide="reset"
      ref="modal-add-client">
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
                ref="nationaliteClientModalAdd"
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
          <b-colxx sm="12">
            <b-form-group label="Numéros de fidélité"
              description="Appuyer sur entrer pour valider">
              <input-tag v-model="numeroFidelite" placeholder="Entrez le(s) numéro(s)"></input-tag>
            </b-form-group>
          </b-colxx>

        </b-row>
      </b-form>

      <template slot="modal-footer">
          <b-button variant="danger" @click="hideModal('modal-add-client')">Annuler</b-button>
          <b-button variant="primary" @click="save('modal-add-client')" class="mr-1">Enregistrer</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import InputTag from '@/components/Form/InputTag'
import { mapGetters } from 'vuex'
import { baseRef } from '@/constants/config'

moment.locale('fr')

export default {
  name: 'AddClient',
  components: {
    VueBootstrapTypeahead,
    InputTag
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
    numeroFidelite: [],
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
    dateDeNaissance: new Date(moment().year(), 0, 1)
  }),
  computed: {
    ...mapGetters({
      listeNationalite: 'getTableNationalite'
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
    reset () {
      this.nom = ''
      this.prenom = ''
      this.adresse.value = ''
      this.$refs.nationaliteClientModalAdd.inputValue = ''
      this.sexe.value = null
      this.dateDeNaissance = new Date()
    },
    valideClient () {
      return this.validNom() && this.validPrenom() && this.validAdresse() && this.nationalite && this.sexe.value
    },
    saveClient () {
      const id = firebase.database().ref().child(`${baseRef.client}`).push().key
      firebase.database().ref(`${baseRef.client}/${id}`).set({
        id: id,
        nom: this.nom.value.toUpperCase(),
        prenom: this.prenom.value.toUpperCase(),
        adresse: this.adresse.value,
        nationalite: this.nationalite,
        dateDeNaissance: moment(this.dateDeNaissance).format('ll'),
        sexe: this.sexe.value,
        status: 'actif',
        numeroFidelite: this.numeroFidelite,
        date: moment().format('lll')
      })
    },
    async save (refname) {
      try {
        if (this.valideClient()) {
          this.saveClient()
          this.$notify('success', '', 'Donnees enregistree', { duration: 3000, permanent: false })
          this.hideModal(refname)
        } else {
          this.$notify('error', 'Erreur:', 'Verifiez les champs', { duration: 3000, permanent: false })
        }
      } catch (error) {
        this.$notify('error', 'Erreur:', error, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>

<style>

</style>
