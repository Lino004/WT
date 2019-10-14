<template>
  <div>
    <div class="d-none">
      <b-row id="print-billet-p" class="invoice-vue">
        <b-colxx xxs="12" class="mb-5">
          <b-card class="mb-5 invoice-contents" no-body>
            <b-card-body class="d-flex flex-column justify-content-between">
              <div class="d-flex flex-column">
                <div class="d-flex flex-row justify-content-between pt-2 pb-2">
                  <div class="d-flex align-self-center">
                    <img height="95" :src="getLogo()" />
                  </div>
                  <div class="d-flex w-30 text-right align-self-center">
                    <p class="text-small text-semi-muted mb-0">
                      Tourisme <br>
                      Billeterie <br>
                      Assurance voyage <br>
                      Reservation d'hôtel <br>
                      Location de voiture <br>
                      Location de salle de conférence
                    </p>
                  </div>
                </div>
                <div class="border-bottom pt-4 mb-5"></div>

                <div class="d-flex flex-row justify-content-between mb-5">
                    <div class="d-flex flex-column w-70 mr-2 p-4 text-semi-muted bg-semi-muted">
                        <p class="mb-0">Periode: du {{startPeriode}} au {{endPeriode}} </p>
                        <p class="mb-0">Nombre de billet vendu: {{tempTable.length}} </p>
                    </div>
                    <!-- <div class="d-flex w-30 flex-column text-right p-4 text-semi-muted bg-semi-muted">
                        <p class="mb-0">Invoice #: 741</p>
                        <p class="mb-0">02.02.2019</p>
                    </div> -->
                </div>

                <b-table striped :items="tempTable" :fields="fields"></b-table>

              </div>

              <div class="d-flex flex-column">
                <div class="border-bottom pt-3 mb-5"></div>
                <table class="table table-borderless d-flex justify-content-end">
                    <tbody>
                        <tr>
                            <td class="text-semi-muted">Total Tarif :</td>
                            <td class="text-right">{{new Intl.NumberFormat().format(sommeTarif)}} FCFA</td>
                        </tr>
                        <tr>
                            <td class="text-semi-muted">Total Commission :</td>
                            <td class="text-right">{{new Intl.NumberFormat().format(sommeCommi)}} FCFA</td>
                        </tr>
                        <tr>
                            <td class="text-semi-muted">Total Reste :</td>
                            <td class="text-right">{{new Intl.NumberFormat().format(sommeReste)}} FCFA</td>
                        </tr>
                    </tbody>
                </table>
                <div class="border-bottom pt-3 mb-5"></div>
                <p class="text-muted text-small text-center">
                  RCCM: RB/PNO/18-A7011 - IFU -1201643628202 <br>
                  wt.travels01@gmail.com (229) 66021620 01 bp 2707 Porto-novo (République du bénin)
                </p>
              </div>

            </b-card-body>
          </b-card>
        </b-colxx>
      </b-row>
    </div>
    <a class="text-danger cursor" @click="$bvModal.show('modal-print-%')"><i class="iconsminds-printer h1"></i></a>
    <b-modal
      id="modal-print-%"
      centered
      ok-title="Imprimer"
      cancel-title="Annuler"
      cancel-variant="danger"
      @ok="calc"
      hide-header>
      <b-form>
        <b-form-group
          label="Entrez le pourcentage a appliquer"
        >
          <b-form-input
            v-model="pourcent"
            type="number"
            max="100"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'

moment.locale()

export default {
  name: 'PrintBillet',
  props: [
    'table',
    'periode'
  ],
  data: () => ({
    fields: [
      { key: 'index', label: 'N°', sortable: true },
      { key: 'date', label: 'Date', sortable: true },
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'prenom', label: 'Prenom', sortable: true },
      { key: 'type', label: 'Passager', sortable: true },
      { key: 'trajet', label: 'Trajet', sortable: true },
      { key: 'tarif', label: 'Tarif', sortable: true },
      { key: 'commission', label: 'Commi.', sortable: true },
      { key: 'reste', label: 'Reste', sortable: true }
    ],
    pourcent: 50,
    tempTable: []
  }),
  computed: {
    startPeriode () {
      return moment(this.periode.start).format('ll')
    },
    endPeriode () {
      return moment(this.periode.end).format('ll')
    },
    sommeTarif () {
      let somme = 0
      this.tempTable.forEach(el => {
        somme = somme + parseInt(el.tarif, 10)
      })
      return somme
    },
    sommeCommi () {
      let somme = 0
      this.tempTable.forEach(el => {
        somme = somme + parseInt(el.commission, 10)
      })
      return somme
    },
    sommeReste () {
      let somme = 0
      this.tempTable.forEach(el => {
        somme = somme + parseInt(el.reste, 10)
      })
      return somme
    }
  },
  methods: {
    printBillet () {
      console.log(this.tempTable)
      this.$htmlToPaper('print-billet-p')
    },
    getLogo () {
      return require('@/assets/img/logo-simple2.png')
    },
    calc () {
      this.tempTable = this.table.slice()
      this.tempTable.forEach(el => {
        el.commission = (el.commission * this.pourcent) / 100
        el.reste = el.tarif - el.commission
      })
      console.log(this.tempTable)
      this.printBillet()
    }
  }
}
</script>

<style>

</style>
