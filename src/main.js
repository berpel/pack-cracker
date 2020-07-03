import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)

import PackCracker from '@/components/PackCracker.vue'
Vue.customElement('pack-cracker', PackCracker)


Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
