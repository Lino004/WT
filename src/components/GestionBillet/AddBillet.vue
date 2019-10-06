<template>
  <div>
    <a v-b-modal.modal-add-billet class="text-primary cursor"><i class="iconsminds-add h1"></i></a>
    <b-modal
      id="modal-add-billet"
      size="lg"
      centered
      title="Enregistrement d'un billet"
      ok-title="Enregistrer"
      cancel-title="Annuler"
      cancel-variant="danger"
      @ok="save"
      no-close-on-backdrop>
      <b-form>
        <b-row>

          <b-colxx sm="6">
            <b-form-group label="Nom(s)">
              <vue-bootstrap-typeahead
                v-model.trim="nom"
                :data="listeClient"
                :serializer="s => s.nom"
                placeholder="Nom(s) du client"
                ref="nomClientModalAdd"
              />
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Prenom(s)">
              <vue-bootstrap-typeahead
                v-model.trim="prenom"
                :data="listeClient"
                :serializer="s => s.prenom"
                placeholder="Prenom(s) du client"
                ref="prenomClientModalAdd"
              />
            </b-form-group>
          </b-colxx>

          <b-colxx sm="6" v-if="!idClient">
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
          <b-colxx sm="6" v-if="!idClient">
            <b-form-group label="Nationalite">
              <b-form-input
                v-model.trim="nationalite.value"
                :state="nationalite.state"
                aria-describedby="msg-err-nationalite"
                placeholder="Nationalite du client"
                @blur="validNationalite"/>
              <b-form-invalid-feedback id="msg-err-nationalite">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6" v-if="!idClient">
            <b-form-group label="Date de naissance">
              <v-date-picker
                mode="single"
                v-model="dateDeNaissance"
                :input-props="{
                  class:'form-control bg-white',
                  readonly: true,
                  placeholder: 'Date de naissance'
                }"
              />
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6" v-if="!idClient">
            <b-form-group label="Sexe">
              <b-form-select
                v-model="sexe.value"
                :options="sexe.options"
                :state="sexe.state"/>
            </b-form-group>
          </b-colxx>

          <b-colxx sm="6">
            <b-form-group label="Type">
              <b-form-select
                v-model="type.value"
                :options="type.options"
                :state="type.state"/>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Aller">
              <b-form-select
                v-model="aller.value"
                :options="aller.options"
                :state="aller.state"/>
            </b-form-group>
          </b-colxx>

          <b-col :cols="aller.value === 'simple' ? 6 : 4">
            <b-form-group label="Trajet">
              <vue-bootstrap-typeahead
                v-model.trim="trajet"
                :data="listeTrajets"
                placeholder="Entrez le traje du vol..."
              />
            </b-form-group>
          </b-col>
          <b-col :cols="aller.value === 'simple' ? 6 : 4">
            <b-form-group label="Date de depart">
              <v-date-picker
                mode="single"
                v-model="dateDepart"
                :input-props="{
                  class:'form-control bg-white',
                  readonly: true
                }"
              />
            </b-form-group>
          </b-col>
          <b-col cols="4" v-if="aller.value !== 'simple'">
            <b-form-group label="Date d'arrive">
              <v-date-picker
                mode="single"
                v-model="dateArrive"
                :input-props="{
                  class:'form-control bg-white',
                  readonly: true
                }"
              />
            </b-form-group>
          </b-col>

          <b-colxx sm="4">
            <b-form-group label="Tarif">
              <b-form-input
                type="number"
                v-model="tarif.value"
                :state="tarif.state"
                aria-describedby="msg-err-tarif"
                placeholder="Tarif"
                @blur="validTarif"
                :min="10000"/>
              <b-form-invalid-feedback id="msg-err-tarif">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group label="Commission">
              <b-form-input
                type="number"
                v-model="commission.value"
                :state="commission.state"
                aria-describedby="msg-err-commission"
                placeholder="Commission"
                @blur="validCommission"/>
              <b-form-invalid-feedback id="msg-err-commission">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group label="Reste">
              <b-form-input
                type="number"
                v-model="reste"
                :state="resteState"
                aria-describedby="msg-err-reste"
                placeholder="Reste"
                @blur="validReste"/>
              <b-form-invalid-feedback id="msg-err-reste">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { mapGetters } from 'vuex'

const date = new Date()
const y = date.getFullYear()
const m = date.getMonth()
const lastDay = new Date(y, m + 1, 0)

moment.locale('fr')

export default {
  name: 'AddBillet',
  components: {
    VueBootstrapTypeahead
  },
  data: () => ({
    nom: '',
    prenom: '',
    adresse: {
      value: '',
      state: null
    },
    nationalite: {
      value: '',
      state: null
    },
    trajet: '',
    type: {
      value: null,
      state: null,
      options: [
        { value: null, text: 'Choisissez un type' },
        { value: 'adt', text: 'Adt' },
        { value: 'chd', text: 'Chd' },
        { value: 'inf', text: 'Inf' }
      ]
    },
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
    aller: {
      value: null,
      state: null,
      options: [
        { value: null, text: 'Simple ou retour' },
        { value: 'simple', text: 'Simple' },
        { value: 'retour', text: 'Retour' }
      ]
    },
    dateDepart: date,
    dateArrive: lastDay,
    tarif: {
      value: 100000,
      state: null
    },
    commission: {
      value: 0,
      state: null
    },
    resteState: null
  }),
  computed: {
    ...mapGetters({
      listeClient: 'getTableClient',
      listeTrajets: 'getTableTrajet'
    }),
    reste () {
      return this.tarif.value - this.commission.value
    },
    idClient () {
      if (this.nom && this.prenom) {
        const find = this.listeClient.find(el => el.nom === this.nom && el.prenom === this.prenom)
        return find ? find.id : ''
      }
      return ''
    }
  },
  methods: {
    validAdresse () {
      if (this.adresse.value) {
        this.adresse.state = null
        return true
      }
      this.adresse.state = false
      return false
    },
    validNationalite () {
      if (this.nationalite.value) {
        this.nationalite.state = null
        return true
      }
      this.nationalite.state = false
      return false
    },
    validType () {
      if (this.type.value) {
        this.type.state = null
        return true
      }
      this.type.state = false
      return false
    },
    validAller () {
      if (this.aller.value) {
        this.aller.state = null
        return true
      }
      this.aller.state = false
      return false
    },
    validTarif () {
      if (this.tarif.value >= 10000) {
        this.tarif.state = null
        return true
      }
      this.tarif.state = false
      return false
    },
    validCommission () {
      if (this.commission.value >= 0) {
        this.commission.state = null
        return true
      }
      this.commission.state = false
      return false
    },
    validReste () {
      if (this.reste >= 10000) {
        this.resteState = null
        return true
      }
      this.resteState = false
      return false
    },
    reset () {
      this.nom = ''
      this.prenom = ''
      this.adresse.value = ''
      this.nationalite.value = ''
      this.sexe.value = ''
      this.type.value = null
      this.aller.value = null
      this.trajet = ''
      this.tarif.value = 100000
      this.commission.value = 0
    },
    async save (bvModalEvt) {
      try {
        let id = this.idClient
        if (!id) {
          if (this.nom && this.prenom && this.validAdresse && this.validNationalite && this.sexe.value) {
            id = firebase.database().ref().child('clients').push().key
            await firebase.database().ref('clients/' + id).set({
              id: id,
              nom: this.nom.toUpperCase(),
              prenom: this.prenom.toUpperCase(),
              adresse: this.adresse.value,
              nationalite: this.nationalite.value,
              dateDeNaissance: moment(this.dateDeNaissance).format('ll'),
              sexe: this.sexe.value,
              date: moment().format('lll')
            })
          } else {
            this.$notify('error', 'Erreur:', 'vérifier les champs puis réessayer', { duration: 3000, permanent: false })
            bvModalEvt.preventDefault()
          }
        }
        if (this.nom && this.prenom && this.validType() &&
          this.validAller() && this.trajet && this.validCommission() &&
          this.validReste() && this.validTarif()) {
          const keyData = firebase.database().ref().child('billets').push().key
          await firebase.database().ref('billets/' + keyData).set({
            id: keyData,
            nom: this.nom.toUpperCase(),
            prenom: this.prenom.toUpperCase(),
            idClient: id,
            type: this.type.value,
            aller: this.aller.value,
            trajet: this.trajet.toUpperCase(),
            dateDepart: moment(this.dateDepart).format('ll'),
            dateArrive: this.aller.value === 'simple' ? '---' : moment(this.dateArrive).format('ll'),
            tarif: this.tarif.value,
            commission: this.commission.value,
            reste: this.reste,
            date: moment().format('lll')
          })
          this.$refs.nomClientModalAdd.inputValue = ''
          this.$refs.prenomClientModalAdd.inputValue = ''
          this.reset()
          this.$notify('success', '', 'Données enregistrées', { duration: 3000, permanent: false })
        } else {
          this.$notify('error', 'Erreur:', 'vérifier les champs puis réessayer', { duration: 3000, permanent: false })
          bvModalEvt.preventDefault()
        }
      } catch (error) {
        this.$notify('error', 'Erreur:', error, { duration: 3000, permanent: false })
        bvModalEvt.preventDefault()
      }
    }
  }
}
</script>

<style>

</style>
