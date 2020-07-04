<template lang="pug">
  .box
    //-.sorts
      button(type="button", @click="setSort('collector_number')", :class="{ selected: sort === 'collector_number' }") Number
      button(type="button", @click="setSort('prices.usd')", :class="{ selected: sort === 'prices.usd' }") Price

    .sets(v-for="(set, key) in cardsBySet")
      .set {{ set.set_name }}
      .cards
        PackCrackerCard(v-for="card, i in set.cards", :card="card")
      
</template>

<script>

import axios from 'axios'
import PackCrackerCard from '@/components/PackCrackerCard.vue'

export default {
  name: 'PackCracker',
  components: {
    PackCrackerCard
  },
  props: {
    cards: {
      type: String
    }
  },
  data () {
    return {
      cardsBySet: {},
      collection: [],
      sort: 'collector_number'
    }
  },
  mounted () {
    let identifiers = JSON.parse(this.cards).map(card => {
      let parts = card.split('|')
      return {
        set: parts[0],
        collector_number: parts[1],
        quantity: parts[2] || 1,
        extras: parts[3] || ''
      }
    })
    //console.log(identifiers)
    this.get(identifiers)
  },
  computed: {
    collectionSorted () {
      return this.collection.sort((a, b) => {
        if (parseInt(a['collector_number']) < parseInt(b['collector_number'])) return -1
        if (parseInt(a['collector_number']) > parseInt(b['collector_number'])) return 1
        return 0
      })
    }
  },
  methods: {
    get (identifiers) {
      axios.post('https://api.scryfall.com/cards/collection', {
        identifiers: identifiers
      }).then(result => {
        //console.log(identifiers, result.data.data)
        this.collection = result.data.data
        this.collection.forEach((card, i) => {
          card.pack_cracker = identifiers[i]
        })
        //console.log(this.collection)
        this.cardsBySet = this.collectionSorted.reduce((sets, card) => {
          if (!sets.hasOwnProperty(card.set)) {
            sets[card.set] = {
              set: card.set,
              set_name: card.set_name,
              cards: []
            }
          }
          sets[card.set].cards.push(card)
          return sets
        }, {})
      })
    },
    setFilter (sort) {
      this.sort = sort
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@700&display=swap')

.box
  width 750px
  .sorts
    margin-bottom 20px
    button
      color #ff302c
      background transparent
      border 2px solid #ff302c
      border-radius 9px
      font-size 1rem
      font-weight 700
      line-height 1
      padding 7px 8px
      margin-right 10px
      outline none
      &.selected
        background #ff302c
        color #f7f7f6
        position relative
        &:after
          position absolute
          content ''
          bottom -7px
          left calc(50% - 6px)
          width 0
          height 0
          border-left 6px solid transparent
          border-right 6px solid transparent
          border-top 6px solid #ff302c

.sets
  margin-bottom 20px          
.set
  font-family 'Work Sans', sans-serif
  margin-bottom 20px

.cards
  display flex
  flex-wrap wrap
</style>
