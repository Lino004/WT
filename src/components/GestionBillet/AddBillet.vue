<template>
  <div>
    <a v-b-modal.modal-add-billet class="text-primary cursor"><i class="iconsminds-add h1"></i></a>
    <b-modal
      id="modal-add-billet"
      size="lg"
      centered
      title="Enregistrement d'un billet"
      no-close-on-backdrop
      @hide="reset"
      ref="modal-add-billet">
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
            <b-form-group label="Nationalite">
              <vue-bootstrap-typeahead
                v-model.trim="nationalite"
                :data="listeNationalite"
                placeholder="Nationalite du client"
                ref="nationaliteClientModalAdd"
              />
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6" v-if="!idClient">
            <b-form-group label="Telephone">
              <b-form-input
                type="number"
                no-wheel
                v-model="adresse.value"
                :state="adresse.state"
                aria-describedby="msg-err-adresse"
                placeholder="Telephone du client"
                @blur="validAdresse"/>
              <b-form-invalid-feedback id="msg-err-adresse">
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
                  class:'form-control colorTheme',
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
                :state="sexe.state"
                plain/>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="12" v-if="!idClient">
            <b-form-group label="Numéros de fidélité"
              description="Appuyer sur entrer pour valider">
              <input-tag v-model="numeroFidelite" placeholder="Entrez le(s) numéro(s)"></input-tag>
            </b-form-group>
          </b-colxx>

          <b-colxx sm="4">
            <b-form-group label="PNR">
              <b-form-input
                v-model.trim="pnr.value"
                :state="pnr.state"
                aria-describedby="msg-err-pnr"
                placeholder="PNR du billet"
                @blur="validPnr"/>
              <b-form-invalid-feedback id="msg-err-pnr">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group label="Numero du billet">
              <b-form-input
                v-model.trim="numeroBillet.value"
                :state="numeroBillet.state"
                aria-describedby="msg-err-numeroBillet"
                placeholder="Numero du billet"
                @blur="validNumeroBillet"/>
              <b-form-invalid-feedback id="msg-err-numeroBillet">
                Entrez une valeur valide
              </b-form-invalid-feedback>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group label="Type de passager">
              <b-form-select
                v-model.lazy="type.value"
                :options="type.options"
                :state="type.state"
                plain/>
            </b-form-group>
          </b-colxx>

          <b-col :cols="aller.value === 'AS' ? 4 : 3">
            <b-form-group label="Type de billet">
              <b-form-select
                v-model.lazy="aller.value"
                :options="aller.options"
                :state="aller.state"
                plain/>
            </b-form-group>
          </b-col>
          <b-col :cols="aller.value === 'AS' ? 4 : 3">
            <b-form-group label="Trajet">
              <vue-bootstrap-typeahead
                v-model.trim="trajet"
                :data="listeTrajets"
                placeholder="Entrez le traje du vol..."
                ref="trajetClientModalAdd"
              />
            </b-form-group>
          </b-col>
          <b-col :cols="aller.value === 'AS' ? 4 : 3">
            <b-form-group label="Date aller">
              <v-date-picker
                mode="single"
                v-model="dateDepart"
                :input-props="{
                  class:'form-control colorTheme',
                  readonly: true
                }"
              />
            </b-form-group>
          </b-col>

          <b-col cols="3" v-if="aller.value !== 'AS'">
            <b-form-group label="Date retour">
              <v-date-picker
                mode="single"
                v-model="dateArrive"
                :input-props="{
                  class:'form-control colorTheme',
                  readonly: true
                }"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
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
          </b-col>
          <b-col cols="3">
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
          </b-col>
          <b-col cols="3">
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
          </b-col>
          <b-col cols="3">
            <b-form-group label="FS">
              <b-form-input
                type="number"
                v-model="fs"
                placeholder="FS"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>

      <template slot="modal-footer">
          <b-button variant="danger" @click="hideModal('modal-add-billet')">Annuler</b-button>
          <b-button variant="primary" @click="save('modal-add-billet')" class="mr-1">Enregistrer</b-button>
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

const date = new Date()
const y = date.getFullYear()
const m = date.getMonth()
const lastDay = new Date(y, m + 1, 0)

moment.locale()

export default {
  name: 'AddBillet',
  components: {
    VueBootstrapTypeahead,
    InputTag
  },
  data: () => ({
    nom: '',
    prenom: '',
    nationalite: '',
    adresse: {
      value: '',
      state: null
    },
    numeroFidelite: [],
    pnr: {
      value: '',
      state: null
    },
    numeroBillet: {
      value: '',
      state: null
    },
    trajet: '',
    type: {
      value: null,
      state: null,
      options: [
        { value: null, text: 'Choisissez un type' },
        { value: 'adt', text: 'ADT' },
        { value: 'chd', text: 'CHD' },
        { value: 'inf', text: 'INF' }
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
    dateDeNaissance: new Date(moment().year(), 0, 1),
    aller: {
      value: null,
      state: null,
      options: [
        { value: null, text: 'Choississez un type' },
        { value: 'AS', text: 'AS' },
        { value: 'AR', text: 'AR' }
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
    fs: 0,
    resteState: null
  }),
  computed: {
    ...mapGetters({
      listeClient: 'getTableClient',
      listeTrajets: 'getTableTrajet',
      listeNationalite: 'getTableNationalite',
      currentUser: 'currentUser'
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
    hideModal (refname) {
      this.$refs[refname].hide()
    },
    validAdresse () {
      if (this.adresse.value) {
        this.adresse.state = null
        return true
      }
      this.adresse.state = false
      return false
    },
    validPnr () {
      if (this.pnr.value.length === 6) {
        this.pnr.state = null
        return true
      }
      this.pnr.state = false
      return false
    },
    validNumeroBillet () {
      if (this.numeroBillet.value) {
        this.numeroBillet.state = null
        return true
      }
      this.numeroBillet.state = false
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
      this.$refs.nomClientModalAdd.inputValue = ''
      this.$refs.prenomClientModalAdd.inputValue = ''
      this.$refs.trajetClientModalAdd.inputValue = ''
      this.$refs.nationaliteClientModalAdd.inputValue = ''
      this.nom = ''
      this.prenom = ''
      this.adresse.value = ''
      this.pnr.value = ''
      this.numeroBillet.value = ''
      this.sexe.value = null
      this.type.value = null
      this.aller.value = null
      this.trajet = ''
      this.tarif.value = 100000
      this.commission.value = 0
      this.fs = 0
    },
    valideBillet () {
      const a = this.validType()
      const b = this.validAller()
      const c = this.validCommission()
      const d = this.validReste()
      const e = this.validTarif()
      const f = this.validPnr()
      const g = this.validNumeroBillet()
      return this.nom && this.prenom && this.trajet && a && b && c && d && e && f && g
    },
    valideClient () {
      return this.nom && this.prenom && this.nationalite && this.validAdresse() && this.sexe.value
    },
    saveClient () {
      const id = firebase.database().ref().child(`${baseRef.client}`).push().key
      firebase.database().ref(`${baseRef.client}/${id}`).set({
        id: id,
        nom: this.nom.toUpperCase(),
        prenom: this.prenom.toUpperCase(),
        adresse: this.adresse.value,
        nationalite: this.nationalite,
        dateDeNaissance: moment(this.dateDeNaissance).format('ll'),
        sexe: this.sexe.value,
        status: 'actif',
        numeroFidelite: this.numeroFidelite,
        date: moment().format('lll')
      })
      return id
    },
    saveBillet (clientId) {
      const keyData = firebase.database().ref().child(`${baseRef.billet}`).push().key
      firebase.database().ref(`${baseRef.billet}/${keyData}`).set({
        id: keyData,
        nom: this.nom.toUpperCase(),
        prenom: this.prenom.toUpperCase(),
        idClient: clientId,
        pnr: this.pnr.value,
        numeroBillet: this.numeroBillet.value,
        type: this.type.value,
        aller: this.aller.value,
        trajet: this.trajet.toUpperCase(),
        dateDepart: moment(this.dateDepart).format('ll'),
        dateArrive: this.aller.value === 'AS' ? '---' : moment(this.dateArrive).format('ll'),
        tarif: this.tarif.value,
        commission: this.commission.value,
        reste: this.reste,
        date: moment().format('lll'),
        status: 'actif',
        fs: this.fs
      })
    },
    async save (refname) {
      try {
        if (!this.idClient) {
          if (this.valideClient() && this.valideBillet()) {
            const clientId = this.saveClient()
            this.saveBillet(clientId)
            this.$notify('success', '', 'Donnees enregistree', { duration: 3000, permanent: false })
            this.hideModal(refname)
          } else {
            this.$notify('error', 'Erreur:', 'Verifiez les champs', { duration: 3000, permanent: false })
          }
        } else {
          if (this.valideBillet()) {
            this.saveBillet(this.idClient)
            this.$notify('success', '', 'Donnees enregistree', { duration: 3000, permanent: false })
            this.hideModal(refname)
          } else {
            this.$notify('error', 'Erreur:', 'Verifiez les champs', { duration: 3000, permanent: false })
          }
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
