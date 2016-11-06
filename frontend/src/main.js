import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Items from './components/Items.vue'
import Resources from './components/Resources.vue'
import Spells from './components/Spells.vue'
import Skills from './components/Skills.vue'
import Recipes from './components/Recipes.vue'
import Player from './components/Player.vue'
import Monsters from './components/Monsters.vue'
import Inn from './components/Inn.vue'
import City from './components/City.vue'
import Location from './components/Location.vue'
import Forge from './components/Forge.vue'
import World from './components/World.vue'

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    { path: '/', component: World, name: 'world' },
    { path: '/world', component: World, name: 'world' },
    { path: '/items', component: Items, name: 'items' },
    { path: '/resources', component: Resources, name: 'resources' },
    { path: '/spells', component: Spells, name: 'spells' },
    { path: '/skills', component: Skills, name: 'skills' },
    { path: '/recipes', component: Recipes, name: 'recipes' },
    { path: '/player', component: Player, name: 'player' },
    { path: '/monsters', component: Monsters, name: 'monsters' },
    { path: '/city', component: City, name: 'city' },
    { path: '/inn', component: Inn, name: 'inn' },
    { path: '/location', component: Location, name: 'location' },
    { path: '/forge', component: Forge, name: 'forge' },
    { path: '*', redirect: '/' }
  ]
});

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')