<template>
    <div id="root">
        <div class="fixed-background">
        <main>
            <div class="container">
              <b-row class="h-100">
                <b-colxx xxs="12" md=10  class="mx-auto my-auto">
                  <b-card class="auth-card rounded_sm" no-body>
                      <div class="position-relative image-side "></div>
                      <div class="form-side">
                        <h6 class="mb-4">Oups ... on dirait qu'une erreur s'est produite!</h6>
                        <p class="mb-0 text-muted text-small mb-0">Code de l'erreur</p>
                        <p class="display-1 font-weight-bold mb-5">404</p>
                        <b-button type="submit" variant="primary" size="lg" class="btn-shadow" @click="goBack">Retour à l'accueil</b-button>
                    </div>
                  </b-card>
                </b-colxx>
              </b-row>
            </div>
        </main>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    goBack () {
      this.$router.push('/')
    }
  },
  mounted () {
    document.body.classList.add('background')
  },
  beforeDestroy () {
    document.body.classList.remove('background')
  }
}
</script>
