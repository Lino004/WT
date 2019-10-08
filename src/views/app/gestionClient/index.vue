<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('menu.gestion-client')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-card-title class="mb-1">
          <div class="d-flex">
            <div class="p-2 align-self-center flex-grow-1">
              <b-row>
                <b-colxx>
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
                    <b-form-input
                      v-model.trim="nom"
                      placeholder="Recherche sur le nom"/>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <b-form-input
                      v-model.trim="prenom"
                      placeholder="Recherche sur le prenom"/>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <b-form-input
                      v-model.trim="nationalite"
                      placeholder="Nationalite"/>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <v-date-picker
                      mode="single"
                      v-model="dateDeNaissance"
                      :input-props="{
                        class:'form-control colorTheme',
                        readonly: false,
                        placeholder: 'Date de naissance'
                      }"
                    />
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <b-form-select
                      v-model.lazy="sexe.value"
                      :options="sexe.options"
                      plain/>
                  </b-form-group>
                </b-colxx>
              </b-row>
            </div>
            <div class="p-2"> <AddClient/> </div>
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
          <template v-slot:cell(type)="data">
            <div class="text-capitalize"> {{data.value}} </div>
          </template>
          <template v-slot:cell(tarif)="data">
            <h6><b-badge variant="primary"> {{new Intl.NumberFormat().format(data.value)}} </b-badge></h6>
          </template>
          <template v-slot:cell(commission)="data">
            <h6><b-badge variant="secondary"> {{new Intl.NumberFormat().format(data.value)}} </b-badge></h6>
          </template>
          <template v-slot:cell(reste)="data">
            <h6><b-badge variant="success"> {{new Intl.NumberFormat().format(data.value)}} </b-badge></h6>
          </template>
          <template v-slot:cell(fs)="data">
            <h6><b-badge variant="dark"> {{new Intl.NumberFormat().format(data.value)}} </b-badge></h6>
          </template>
          <template v-slot:cell(status)="data">
            <h6><b-badge variant="light"> {{data.value}} </b-badge></h6>
          </template>
          <template v-slot:cell(actions)="data">
            <span
              class="h6 text-danger cursor"
              @click="selectBillet(data.item, 'modal-delete-client')"
              v-if="currentUser.status === 'admin'">
              <i class="simple-icon-trash"></i>
            </span>
            <span
              class="h6 text-secondary cursor"
              @click="selectBillet(data.item, 'modal-annule-client')">
              <i class="iconsminds-close"></i>
            </span>
            <span
              class="h6 text-primary cursor"
              @click="selectBillet(data.item, 'modal-modif-client')">
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

        <DeleteClient :id="clientSelect.id"/>
        <AnnuleClient :id="clientSelect.id"/>
        <ModifClient :data="clientSelect"/>

      </b-card>
    </b-colxx>
  </b-row>
</div>
</template>

<script>
import moment from 'moment'
import AddClient from '@/components/GestionClient/AddClient.vue'
import DeleteClient from '@/components/GestionClient/DeleteClient.vue'
import AnnuleClient from '@/components/GestionClient/AnnuleClient.vue'
import ModifClient from '@/components/GestionClient/ModifClient.vue'
import { mapGetters } from 'vuex'

moment.locale('fr')

export default {
  components: {
    AddClient,
    DeleteClient,
    AnnuleClient,
    ModifClient
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      clientSelect: {},
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
      nom: '',
      prenom: '',
      nationalite: '',
      dateDeNaissance: null,
      arrive: null,
      sexe: {
        value: null,
        options: [
          { value: null, text: 'Recherche un sexe' },
          { value: 'M', text: 'M' },
          { value: 'F', text: 'F' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      items: 'getTableClient',
      loading: 'getLoadingTableClient',
      currentUser: 'currentUser'
    }),
    fields () {
      if (this.currentUser.status === 'admin') {
        return [
          { key: 'index', label: 'N°', sortable: true },
          { key: 'date', label: 'Date', sortable: true },
          { key: 'nom', label: 'Nom', sortable: true },
          { key: 'prenom', label: 'Prenom', sortable: true },
          { key: 'adresse', sortable: true },
          { key: 'nationalite', label: 'Nationalite', sortable: true },
          { key: 'dateDeNaissance', label: 'Date de naissance', sortable: true },
          { key: 'sexe', sortable: true },
          'status',
          'actions'
        ]
      }
      return [
        { key: 'index', label: 'N°', sortable: true },
        { key: 'date', label: 'Date', sortable: true },
        { key: 'nom', label: 'Nom', sortable: true },
        { key: 'prenom', label: 'Prenom', sortable: true },
        { key: 'adresse', sortable: true },
        { key: 'nationalite', label: 'Nationalite', sortable: true },
        { key: 'dateDeNaissance', label: 'Date de naissance', sortable: true },
        { key: 'sexe', sortable: true },
        'actions'
      ]
    },
    tempDataPeriode () {
      if (this.periode) {
        return this.items.filter(el => moment(this.periode.start).isSameOrBefore(moment(el.date, 'll')) &&
          moment(this.periode.end).isSameOrAfter(moment(el.date, 'll')))
      }
      return this.items
    },
    table () {
      let data = this.items
      if (this.currentUser.status !== 'admin') {
        data = data.filter(el => el.status !== 'annulé')
      }
      if (this.periode) {
        data = data.filter(el => moment(this.periode.start).isSameOrBefore(moment(el.date, 'll')) &&
          moment(this.periode.end).isSameOrAfter(moment(el.date, 'll')))
      }
      if (this.nom) {
        data = data.filter(el => el.nom.toLowerCase().includes(this.nom.toLowerCase()))
      }
      if (this.prenom) {
        data = data.filter(el => el.prenom.toLowerCase().includes(this.prenom.toLowerCase()))
      }
      if (this.nationalite) {
        data = data.filter(el => el.nationalite.toLowerCase().includes(this.nationalite.toLowerCase()))
      }
      if (this.dateDeNaissance) {
        data = data.filter(el => moment(el.dateDepart, 'll').format('ll') === moment(this.dateDeNaissance).format('ll'))
      }
      if (this.sexe.value) {
        data = data.filter(el => el.sexe === this.sexe.value)
      }
      return data
    }
  },
  methods: {
    selectBillet (data, refname) {
      this.clientSelect = data
      this.$bvModal.show(refname)
    }
  }
}
</script>
