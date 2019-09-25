<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('menu.wt')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4" title="Liste">
        <b-table striped :items="items" :fields="fields"></b-table>
      </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>
<script>
import { apiUrl } from '@/constants/config'
import axios from 'axios'

export default {
  data () {
    return {
      fields: ['first_name', 'last_name', 'age'],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      ]
    }
  },
  methods: {}
}
</script>
