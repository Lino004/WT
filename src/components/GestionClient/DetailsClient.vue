<template>
  <b-modal
    id="modal-detail-client"
    title="Details du client"
    modal-class="modal-right"
    scrollable
    hide-footer
    @shown="updateDataModal">
    <div>
      <b-list-group flush>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Nom: <span> {{infoClient.nom}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Prenom: <span> {{infoClient.prenom}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Adresse: <span> {{infoClient.adresse}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Date de naissance: <span> {{formatDateLL(infoClient.dateDeNaissance)}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Sexe: <span> {{infoClient.sexe}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Numero de fidelite:
          <span>
            <p
              class="m-0"
              v-for="(num, i) in infoClient.numeroFidelite"
              :key="i">{{num}}</p>
          </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Liste billet:
          <span>
            <p
              class="m-0"
              v-for="(js, i) in listeBillet"
              :key="i">{{js.numeroBillet}}</p>
          </span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-modal>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailClient',
  props: ['id'],
  data: () => ({
    infoClient: {},
    listeBillet: []
  }),
  computed: {
    ...mapGetters({
      data: 'getTableClient',
      dataBillet: 'getTableBillet'
    })
  },
  methods: {
    formatDateLL (date) {
      if (date === '---') return date
      return moment(date, 'll').format('DD/MM/YY')
    },
    formatDateLLL (date) {
      return moment(date, 'lll').format('DD/MM/YY hh:mm')
    },
    updateDataModal () {
      this.infoClient = this.data.find(el => el.id === this.id)
      this.listeBillet = this.dataBillet.filter(el => el.idClient === this.id)
    }
  }
}
</script>

<style>

</style>
