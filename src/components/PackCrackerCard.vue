<template lang="pug">
  a.card(:href="card.scryfall_uri", target="_blank")
    .card-image
      img(:src="card.image_uris.small")
    .card-details
      .card-header
        .card-quantity(v-if="card.pack_cracker.quantity > 1") ({{ card.pack_cracker.quantity }}x)
        .card-name {{ card.name }}
      .card-set {{ setText }}
      .card-price {{ cardPrice }}
      
</template>

<script>

export default {
  name: 'PackCrackerCard',
  props: {
    card: {
      type: Object
    }
  },
  computed: {
    setText () {
      let text = `#${this.card.collector_number} - ${this.card.rarity}`
      if (this.card.pack_cracker.extras) {
        text += ` - ${this.card.pack_cracker.extras}`
      }
      return text
    },
    cardPrice () {
      let price = 'N/A'
      if (this.card.pack_cracker.extras.indexOf('foil') > -1) {
        if (this.card.prices.usd_foil) {
          price = `$${this.card.prices.usd_foil}`
        }
      } else if (this.card.prices.usd) {
        price = `$${this.card.prices.usd}`
      }
      return price
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@700&display=swap')

.card
  align-items center
  color inherit
  display flex
  margin 0 -5px
  margin-bottom 20px
  text-decoration none
  width 33.333%
  & > *
    padding 0 5px
  .card-image
    transition 200ms
    img
      border-radius 5%
      height 60px
      vertical-align top
  .card-details
    overflow hidden
    .card-header
      align-items center
      display flex
      .card-quantity
        font-size 12px
        opacity .8
        padding-right 5px
      .card-name
        font-weight 500
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .card-set
      font-size 12px
      opacity .8
      text-transform uppercase
  &:hover
    .card-image
      transform scale(3)
</style>
