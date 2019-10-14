<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('menu.gestion-autre')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4 radius-20">
        <b-card-title class="mb-1">
          <div class="d-flex">
            <div class="p-2 align-self-center flex-grow-1">
              <b-row>
                <b-colxx v-if="currentUser.status === 'admin'">
                  <b-form-group>
                    <v-date-picker
                      mode="range"
                      v-model="periode"
                      :input-props="{
                        class:'form-control colorTheme',
                        readonly: true,
                        placeholder: 'Recherche sur une periode'
                      }"
                    />
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <b-form-select
                      v-model.lazy="typeSearch.value"
                      :options="typeSearch.options"
                      plain/>
                  </b-form-group>
                </b-colxx>

                <b-colxx></b-colxx>

                <b-colxx>
                  <b-form-group>
                    <b-form-select
                      v-model.lazy="type.value"
                      :options="type.options"
                      plain/>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <b-form-input
                      type="number"
                      v-model="montant"
                      placeholder="Entrez son montant"/>
                  </b-form-group>
                </b-colxx>
              </b-row>
            </div>
            <div class="p-2">
              <a class="text-primary cursor" @click="save()">
                <i class="iconsminds-add h1"></i>
              </a>
            </div>
          </div>
        </b-card-title>

        <div class="separator mb-5"></div>

        <b-table
          hover
          :items="table"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :busy="loading">
          <template v-slot:cell(montant)="data">
            <h6>
              <b-badge
                variant="warning"
                :id="`modif-autre-${data.index}`">
                {{new Intl.NumberFormat().format(data.value)}}
              </b-badge>
            </h6>
          </template>
          <template v-slot:cell(actions)="data">
            <span
              class="h6 text-danger cursor"
              @click="selectAutre(data.item, 'modal-delete-autre')">
              <i class="simple-icon-trash"></i>
            </span>
            <span
              class="h6 text-primary cursor"
              @click="selectAutre(data.item, 'modal-modif-autre')">
              <i class="simple-icon-note"></i>
            </span>
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Patienter...</strong>
            </div>
          </template>
        </b-table>

        <b-pagination
          size="sm"
          align="center"
          :total-rows="table.length"
          :per-page="perPage"
          v-model="currentPage"
          v-if="table.length > 5"
          >
            <template v-slot:next-text>
              <i class="simple-icon-arrow-right"/>
            </template>
            <template v-slot:prev-text>
              <i class="simple-icon-arrow-left"/>
            </template>
            <template v-slot:first-text>
              <i class="simple-icon-control-start"/>
            </template>
            <template v-slot:last-text>
              <i class="simple-icon-control-end"/>
            </template>
        </b-pagination>

        <div class="separator mb-5" v-if="table.length"></div>

        <b-row align-h="end" v-if="table.length && currentUser.status === 'admin'">
          <b-col cols="4" class="text-right">
            <b-list-group>
              <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center h5 font-weight-bold">
                Total :
                <b-badge variant="warning">{{new Intl.NumberFormat().format(somme)}} FCFA</b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>

        <DeleteAutre :id="autreSelect.id"/>
        <ModifAutre :data="autreSelect"/>

      </b-card>
    </b-colxx>
  </b-row>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
import DeleteAutre from '@/components/GestionAutre/DeleteAutre.vue'
import ModifAutre from '@/components/GestionAutre/ModifAutre.vue'
import { mapGetters } from 'vuex'
import { baseRef } from '@/constants/config'

moment.locale('fr')

export default {
  components: {
    DeleteAutre,
    ModifAutre
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      autreSelect: {},
      periode: {
        end: new Date(
          moment().year(),
          moment().month(),
          moment().date()
        ),
        start: new Date(
          moment().year(),
          moment().month(),
          moment().date()
        )
      },
      montant: 0,
      typeSearch: {
        value: null,
        options: [
          { value: null, text: 'Filtre type' },
          { value: 'reservation-billet', text: 'Réservation billet' },
          { value: 'reservation-hotel', text: 'Réservation hôtel' },
          { value: 'location-voiture', text: 'Location de voiture' },
          { value: 'transfert-argent', text: "Transfert d'argent" },
          { value: 'assurance-voyage', text: 'Assurance voyage' }
        ]
      },
      type: {
        value: null,
        options: [
          { value: null, text: 'Choisissez un type' },
          { value: 'reservation-billet', text: 'Réservation billet' },
          { value: 'reservation-hotel', text: 'Réservation hôtel' },
          { value: 'location-voiture', text: 'Location de voiture' },
          { value: 'transfert-argent', text: "Transfert d'argent" },
          { value: 'assurance-voyage', text: 'Assurance voyage' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      items: 'getTableAutre',
      loading: 'getLoadingTableAutre',
      currentUser: 'currentUser'
    }),
    fields () {
      return [
        { key: 'index', label: 'N°', sortable: true },
        { key: 'date', sortable: true },
        { key: 'type', sortable: true },
        { key: 'montant', sortable: true },
        'actions'
      ]
    },
    somme () {
      let somme = 0
      this.table.forEach(el => {
        somme = somme + parseInt(el.montant, 10)
      })
      return somme
    },
    table () {
      let data = this.items
      if (this.periode) {
        data = data.filter(el => moment(this.periode.start).isSameOrBefore(moment(el.date, 'll')) &&
          moment(this.periode.end).isSameOrAfter(moment(el.date, 'll')))
      }
      if (this.typeSearch.value) {
        data = data.filter(el => el.type === this.typeSearch.value)
      }
      return data
    }
  },
  methods: {
    selectAutre (data, refname) {
      this.autreSelect = data
      this.$bvModal.show(refname)
    },
    async save () {
      try {
        if (this.montant > 0 && this.type) {
          const id = firebase.database().ref().child(`${baseRef.autre}`).push().key
          await firebase.database().ref(`${baseRef.autre}/${id}`).set({
            id: id,
            type: this.type.value,
            montant: this.montant,
            date: moment().format('lll')
          })
          this.$notify('success', '', 'Donnees enregistree', { duration: 3000, permanent: false })
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
