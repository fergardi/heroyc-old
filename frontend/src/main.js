import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Items from './components/Items.vue'
import Resources from './components/Resources.vue'
import Spells from './components/Spells.vue'
import Recipes from './components/Recipes.vue'
import Sales from './components/Sales.vue'
import Player from './components/Player.vue'
import Battle from './components/Battle.vue'
import Monsters from './components/Monsters.vue'
import Worldmap from './components/Worldmap.vue'

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    { path: '/', component: Worldmap },
    { path: '/items', component: Items },
    { path: '/resources', component: Resources },
    { path: '/spells', component: Spells },
    { path: '/recipes', component: Recipes },
    { path: '/sales', component: Sales },
    { path: '/player', component: Player },
    { path: '/battle', component: Battle },
    { path: '/monsters', component: Monsters },
    { path: '*', redirect: '/' }
  ]
});

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')

