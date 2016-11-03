import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Items from './components/Items.vue'
import Resources from './components/Resources.vue'
import Spells from './components/Spells.vue'
import Recipes from './components/Recipes.vue'
import Player from './components/Player.vue'
import Monsters from './components/Monsters.vue'
import City from './components/City.vue'
import Dungeon from './components/Dungeon.vue'
import Tower from './components/Tower.vue'
import Mine from './components/Mine.vue'
import Forge from './components/Forge.vue'
import World from './components/World.vue'

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    { path: '/', component: World },
    { path: '/items', component: Items },
    { path: '/resources', component: Resources },
    { path: '/spells', component: Spells },
    { path: '/recipes', component: Recipes },
    { path: '/player', component: Player, name: 'player' },
    { path: '/monsters', component: Monsters },
    { path: '/city', component: City, name: 'city' },
    { path: '/dungeon', component: Dungeon, name: 'dungeon' },
    { path: '/tower', component: Tower, name: 'tower' },
    { path: '/mine', component: Mine, name: 'mine' },
    { path: '/forge', component: Forge, name: 'forge' },
    { path: '*', redirect: '/' }
  ]
});

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')

