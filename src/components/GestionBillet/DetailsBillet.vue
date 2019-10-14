<template>
  <b-modal
    id="modal-detail-billet"
    title="Details billet"
    modal-class="modal-right"
    scrollable
    hide-footer>
    <div>
      <b-list-group flush>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Numero de billet: <span> {{data.numeroBillet}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Nom: <span> {{data.nom}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Prenom: <span> {{data.prenom}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          PNR: <span> {{data.pnr}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center"
          v-if="data.type">
          Type de passeger: <span> {{data.type.toUpperCase()}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Type de billet: <span> {{data.aller === 'AS' ? 'Aller simple' : 'Aller retour'}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Tajet: <span> {{data.trajet}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Date de depart: <span> {{formatDateLL(data.dateDepart)}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Date de depart: <span> {{formatDateLL(data.dateArrive)}} </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Tarif: <span> <b-badge variant="primary"> {{new Intl.NumberFormat().format(data.tarif)}} FCFA </b-badge> </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Commission: <span> <b-badge variant="secondary"> {{new Intl.NumberFormat().format(data.commission)}} FCFA </b-badge> </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          Reste: <span> <b-badge variant="success"> {{new Intl.NumberFormat().format(data.reste)}} FCFA </b-badge> </span>
        </b-list-group-item>
        <b-list-group-item class="colorTheme d-flex justify-content-between align-items-center">
          FS: <span> <b-badge variant="dark"> {{new Intl.NumberFormat().format(data.fs)}} FCFA </b-badge> </span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-modal>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DetailBillet',
  props: ['data'],
  methods: {
    formatDateLL (date) {
      if (date === '---') return date
      return moment(date, 'll').format('DD/MM/YY')
    },
    formatDateLLL (date) {
      return moment(date, 'lll').format('DD/MM/YY hh:mm')
    }
  }
}
</script>

<style>

</style>
