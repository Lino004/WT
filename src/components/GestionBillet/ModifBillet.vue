<template>
  <div>
    <b-modal
      id="modal-modif-billet"
      size="lg"
      centered
      title="Modification d'un billet"
      no-close-on-backdrop
      @shown="updateDataModal"
      ref="modal-modif-billet">
      <b-form>
        <b-row>

          <b-colxx sm="6">
            <b-form-group label="Nom(s)">
              <vue-bootstrap-typeahead
                v-model.trim="nom"
                :data="listeClient"
                :serializer="s => s.nom"
                placeholder="Nom(s) du client"
                ref="nomClientModalModif"
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
                ref="prenomClientModalModif"
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
              <vue-bootstrap-typeahead
                v-model.trim="nationalite"
                :data="listeNationalite"
                placeholder="Nationalite du client"
                ref="nationaliteClientModalModif"
              />
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

          <b-colxx sm="6">
            <b-form-group label="Type de passager">
              <b-form-select
                v-model="type.value"
                :options="type.options"
                :state="type.state"
                plain/>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group label="Type de billet">
              <b-form-select
                v-model="aller.value"
                :options="aller.options"
                :state="aller.state"
                plain/>
            </b-form-group>
          </b-colxx>

          <b-col :cols="aller.value === 'AS' ? 6 : 4">
            <b-form-group label="Trajet">
              <vue-bootstrap-typeahead
                v-model.trim="trajet"
                :data="listeTrajets"
                placeholder="Entrez le traje du vol..."
                ref="trajetClientModalModif"
              />
            </b-form-group>
          </b-col>
          <b-col :cols="aller.value === 'AS' ? 6 : 4">
            <b-form-group label="Date de depart">
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
          <b-col cols="4" v-if="aller.value !== 'AS'">
            <b-form-group label="Date d'arrive">
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

          <b-col :cols="currentUser.status === 'admin' ? 3 : 4">
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
          <b-col :cols="currentUser.status === 'admin' ? 3 : 4">
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
          <b-col :cols="currentUser.status === 'admin' ? 3 : 4">
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
          <b-col cols="3" v-if="currentUser.status === 'admin'">
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
          <b-button variant="danger" @click="hideModal('modal-modif-billet')">Annuler</b-button>
          <b-button variant="primary" @click="update('modal-modif-billet')" class="mr-1">Enregistrer</b-button>
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
  name: 'ModifBillet',
  props: ['data'],
  components: {
    VueBootstrapTypeahead
  },
  data: () => ({
    nom: '',
    prenom: '',
    nationalite: '',
    adresse: {
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
        { value: null, text: 'Choississez un type' },
        { value: 'AS', text: 'AS' },
        { value: 'AR', text: 'AR' }
      ]
    },
    dateDepart: null,
    dateArrive: null,
    tarif: {
      value: 100000,
      state: null
    },
    commission: {
      value: 0,
      state: null
    },
    resteState: null,
    fs: 0,
    idBillet: null
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
    valideBillet () {
      const a = this.validType()
      const b = this.validAller()
      const c = this.validCommission()
      const d = this.validReste()
      const e = this.validTarif()
      return this.nom && this.prenom && this.trajet && a && b && c && d && e
    },
    valideClient () {
      return this.nom && this.prenom && this.validAdresse() && this.nationalite && this.sexe.value
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
        date: moment().format('lll')
      })
      return id
    },
    updateBillet (clientId) {
      firebase.database().ref(`${baseRef.billet}/`).child(this.idBillet).update({
        nom: this.nom.toUpperCase(),
        prenom: this.prenom.toUpperCase(),
        idClient: clientId,
        type: this.type.value,
        aller: this.aller.value,
        trajet: this.trajet.toUpperCase(),
        dateDepart: moment(this.dateDepart).format('ll'),
        dateArrive: this.aller.value === 'AS' ? '---' : moment(this.dateArrive).format('ll'),
        tarif: this.tarif.value,
        commission: this.commission.value,
        reste: this.reste,
        date: moment().format('lll'),
        fs: this.fs
      })
    },
    async update (refname) {
      try {
        if (!this.idClient) {
          if (this.valideClient() && this.valideBillet()) {
            const clientId = this.saveClient()
            this.updateBillet(clientId)
            this.$notify('success', '', 'Donnees modifiee', { duration: 3000, permanent: false })
            this.hideModal(refname)
          } else {
            this.$notify('error', 'Erreur:', 'Verifiez les champs', { duration: 3000, permanent: false })
          }
        } else {
          if (this.valideBillet()) {
            this.updateBillet(this.idClient)
            this.$notify('success', '', 'Donnees modifiee', { duration: 3000, permanent: false })
            this.hideModal(refname)
          } else {
            this.$notify('error', 'Erreur:', 'Verifiez les champs', { duration: 3000, permanent: false })
          }
        }
      } catch (error) {
        this.$notify('error', 'Erreur:', error, { duration: 3000, permanent: false })
      }
    },
    updateDataModal () {
      this.$refs.nomClientModalModif.inputValue = this.data.nom
      this.$refs.prenomClientModalModif.inputValue = this.data.prenom
      this.$refs.trajetClientModalModif.inputValue = this.data.trajet
      this.nom = this.data.nom
      this.prenom = this.data.prenom
      this.type.value = this.data.type
      this.aller.value = this.data.aller
      this.trajet = this.data.trajet
      this.tarif.value = this.data.tarif
      this.fs = this.data.fs
      this.commission.value = this.data.commission
      this.idBillet = this.data.id
      this.dateDepart = new Date(
        moment(this.data.dateDepart, 'll').year(),
        moment(this.data.dateDepart, 'll').month(),
        moment(this.data.dateDepart, 'll').date()
      )
      this.dateArrive = this.data.dateArrive ? new Date(
        moment(this.data.dateArrive, 'll').year(),
        moment(this.data.dateArrive, 'll').month(),
        moment(this.data.dateArrive, 'll').date()
      ) : null
    }
  }
}
</script>

<style>

</style>
