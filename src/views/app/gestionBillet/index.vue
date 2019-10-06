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
        <b-table hover striped :items="table" :fields="fields"></b-table>
      </b-card>
    </b-colxx>
  </b-row>
</div>
</template>

<script>
import moment from 'moment'
import AddBillet from '@/components/GestionBillet/AddBillet.vue'

moment.locale('fr')

export default {
  components: {
    AddBillet
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
          key: 'destination',
          label: 'Dest.',
          sortable: true
        },
        {
          key: 'tarif',
          label: 'Tarif',
          sortable: true
        },
        {
          key: 'commi',
          label: 'Commi.',
          sortable: true
        },
        {
          key: 'reste',
          label: 'Reste',
          sortable: true
        }
      ],
      items: [
        { date: moment().format('lll'), prenom: 'Lino', nom: 'Dickerson', destination: 'Cotonou - Doubai', tarif: 30000, commi: 30000, reste: 30000 },
        { date: moment().format('lll'), prenom: 'Nabilath', nom: 'Larsen', destination: 'Milan - Hawai', tarif: 30000, commi: 30000, reste: 30000 },
        { date: moment().format('lll'), prenom: 'Cranolle', nom: 'Geneva', destination: 'Cotonou - Chicago', tarif: 30000, commi: 30000, reste: 30000 },
        { date: moment().format('lll'), prenom: 'Frederick', nom: 'Jami', destination: 'Lagos - New-York', tarif: 30000, commi: 30000, reste: 30000 }
      ]
    }
  },
  computed: {
    table () {
      let index = 0
      this.items.forEach(el => {
        el.index = index + 1
        index += 1
      })
      return this.items
    }
  },
  methods: {}
}
</script>
