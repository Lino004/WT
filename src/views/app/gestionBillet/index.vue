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
            <div class="p-2 align-self-center flex-grow-1 h3">Liste</div>
            <div class="p-2"> <AddBillet/> </div>
          </div>
        </b-card-title>
        <b-table hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
          <template slot="index" slot-scope="data">
            {{data.index + 1}}
          </template>
          <template slot="type" slot-scope="data">
            <div class="text-capitalize"> {{data.value}} </div>
          </template>
          <template slot="aller" slot-scope="data">
            <div class="text-capitalize"> Aller {{data.value}} </div>
          </template>
          <template slot="actions" slot-scope="data">
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
          :total-rows="items.length"
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
      perPage: 10,
      billetSelect: {}
    }
  },
  computed: {
    ...mapGetters({
      items: 'getTableBillet'
    })
  },
  methods: {
    selectBillet (data) {
      this.billetSelect = data
    }
  }
}
</script>
