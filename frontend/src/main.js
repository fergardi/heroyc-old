import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Items from './components/Items.vue'
import Resources from './components/Resources.vue'
import Spells from './components/Spells.vue'

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    { path: '/', component: Items },
    { path: '/items', component: Items },
    { path: '/resources', component: Resources },
    { path: '/spells', component: Spells },
    { path: '*', redirect: '/' }
  ]
});

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')
