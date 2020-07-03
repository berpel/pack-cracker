<template lang="pug">
  #app
    .wrap
      pack-cracker(cards='["m21|318","m21|316","m21|314|2","m21|319","m21|280","m21|48||foil","m21|104","m21|76","m21|38","m21|197","m21|239","m21|254","m21|139","m21|48","m21|164|2","m21|6","m21|143","m21|179","m21|228","m21|7","m21|183","m21|305","m21|108","m21|114","m21|103","m21|1","m21|276"]')

</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      cards: [{quantity: 2, number: 1}, {quantity: 2, number: 2}]
    }
  }
}
</script>

<style lang="stylus">
html, body
  background-color #f7f7f6
  padding 0
  margin 0
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  //text-align center
  color #2c3e50
  padding-top 60px
  
  .wrap
    margin 0 auto
    max-width 760px
</style>
