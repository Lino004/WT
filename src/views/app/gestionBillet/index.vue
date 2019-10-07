<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('menu.gestion-billet')"/>
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
                        class:'form-control bg-white',
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
                      v-model.trim="trajet"
                      placeholder="Recherche sur le trajet"/>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <v-date-picker
                      mode="single"
                      v-model="depart"
                      :input-props="{
                        class:'form-control bg-white',
                        readonly: false,
                        placeholder: 'Recherche sur une date de depart'
                      }"
                    />
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group>
                    <v-date-picker
                      mode="single"
                      v-model="arrive"
                      :input-props="{
                        class:'form-control bg-white',
                        readonly: false,
                        placeholder: 'Recherche sur une date arrive'
                      }"
                    />
                  </b-form-group>
                </b-colxx>
              </b-row>
            </div>
            <div class="p-2"> <AddBillet/> </div>
          </div>
        </b-card-title>

        <div class="separator mb-5"></div>

        <b-table hover :items="table" :fields="fields" :current-page="currentPage" :per-page="perPage">
          <template v-slot:cell(type)="data">
            <div class="text-capitalize"> {{data.value}} </div>
          </template>
          <template v-slot:cell(tarif)="data">
            <h6><b-badge variant="primary"> {{new Intl.NumberFormat().format(data.value)}} </b-badge></h6>
          </template>
          <template v-slot:cell(commission)="data">
            <h6><b-badge variant="light"> {{new Intl.NumberFormat().format(data.value)}} </b-badge></h6>
          </template>
          <template v-slot:cell(reste)="data">
            <h6><b-badge variant="success"> {{new Intl.NumberFormat().format(data.value)}} </b-badge></h6>
          </template>
          <template v-slot:cell(actions)="data">
            <span
              class="h6 text-danger cursor"
              v-b-modal.modal-delete-billet
              @click="selectBillet(data.item)">
              <i class="simple-icon-trash"></i>
            </span>
            <span
              class="h6 text-primary cursor"
              v-b-modal.modal-modif-billet
              @click="selectBillet(data.item)">
              <i class="simple-icon-note"></i>
            </span>
          </template>
        </b-table>

        <b-pagination
          size="sm"
          align="center"
          :total-rows="table.length"
          :per-page="perPage"
          v-model="currentPage"
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

        <div class="separator mb-5"></div>

        <b-row align-h="end">
          <b-col cols="4" class="text-right">
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between align-items-center h5 font-weight-bold">
                Total Tarif :
                <b-badge variant="primary">{{new Intl.NumberFormat().format(sommeTarif)}} FCFA</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center h5 font-weight-bold">
                Total Commission :
                <b-badge variant="light">{{new Intl.NumberFormat().format(sommeCommi)}} FCFA</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center h5 font-weight-bold">
                Total Reste :
                <b-badge variant="success">{{new Intl.NumberFormat().format(sommeReste)}} FCFA</b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
        <DeleteBillet :id="billetSelect.id"/>
        <ModifBillet :data="billetSelect"/>

      </b-card>
    </b-colxx>
  </b-row>
</div>
</template>

<script>
import moment from 'moment'
import AddBillet from '@/components/GestionBillet/AddBillet.vue'
import DeleteBillet from '@/components/GestionBillet/DeleteBillet.vue'
import ModifBillet from '@/components/GestionBillet/ModifBillet.vue'
import { mapGetters } from 'vuex'

moment.locale('fr')

export default {
  components: {
    AddBillet,
    DeleteBillet,
    ModifBillet
  },
  data () {
    return {
      fields: [
        {
          key: 'index',
          label: 'N°',
          sortable: true
        },
        {
          key: 'date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'nom',
          label: 'Nom',
          sortable: true
        },
        {
          key: 'prenom',
          label: 'Prenom',
          sortable: true
        },
        {
          key: 'type',
          label: 'Passager',
          sortable: true
        },
        {
          key: 'aller',
          label: 'Billet',
          sortable: true
        },
        {
          key: 'trajet',
          label: 'Trajet',
          sortable: true
        },
        {
          key: 'dateDepart',
          label: 'Date depart',
          sortable: true
        },
        {
          key: 'dateArrive',
          label: 'Date arrive',
          sortable: true
        },
        {
          key: 'tarif',
          label: 'Tarif',
          sortable: true
        },
        {
          key: 'commission',
          label: 'Commi.',
          sortable: true
        },
        {
          key: 'reste',
          label: 'Reste',
          sortable: true
        },
        'actions'
      ],
      currentPage: 1,
      perPage: 5,
      billetSelect: {},
      periode: {
        end: new Date(),
        start: new Date()
      },
      nom: '',
      prenom: '',
      trajet: '',
      depart: null,
      arrive: null
    }
  },
  computed: {
    ...mapGetters({
      items: 'getTableBillet'
    }),
    tempDataPeriode () {
      if (this.periode) {
        return this.items.filter(el => moment(el.date, 'll').format('ll') >= moment(this.periode.start).format('ll') &&
          moment(el.date, 'll').format('ll') <= moment(this.periode.end).format('ll'))
      }
      return this.items
    },
    sommeTarif () {
      let somme = 0
      this.tempDataPeriode.forEach(el => {
        somme = somme + parseInt(el.tarif, 10)
      })
      return somme
    },
    sommeCommi () {
      let somme = 0
      this.tempDataPeriode.forEach(el => {
        somme = somme + parseInt(el.commission, 10)
      })
      return somme
    },
    sommeReste () {
      let somme = 0
      this.tempDataPeriode.forEach(el => {
        somme = somme + parseInt(el.reste, 10)
      })
      return somme
    },
    table () {
      let data = this.items
      if (this.periode) {
        data = data.filter(el => moment(el.date, 'll').format('ll') >= moment(this.periode.start).format('ll') &&
          moment(el.date, 'll').format('ll') <= moment(this.periode.end).format('ll'))
      }
      if (this.nom) {
        data = data.filter(el => el.nom.toLowerCase().includes(this.nom.toLowerCase()))
      }
      if (this.prenom) {
        data = data.filter(el => el.prenom.toLowerCase().includes(this.prenom.toLowerCase()))
      }
      if (this.trajet) {
        data = data.filter(el => el.trajet.toLowerCase().includes(this.trajet.toLowerCase()))
      }
      if (this.depart) {
        data = data.filter(el => moment(el.dateDepart, 'll').format('ll') === moment(this.depart).format('ll'))
      }
      if (this.arrive) {
        data = data.filter(el => moment(el.dateArrive, 'll').format('ll') === moment(this.arrive).format('ll'))
      }
      return data
    }
  },
  methods: {
    selectBillet (data) {
      this.billetSelect = data
    }
  }
}
</script>
