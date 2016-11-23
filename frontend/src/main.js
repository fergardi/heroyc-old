import Vue from 'vue'
import VueRouter from 'vue-router'
import VueInternalization from 'vue-i18n'
import VueSocketio from 'vue-socket.io'

import App from './App.vue'
import Home from './views/Home.vue'
import Items from './views/Items.vue'
import Resources from './views/Resources.vue'
import Spells from './views/Spells.vue'
import Skills from './views/Skills.vue'
import Recipes from './views/Recipes.vue'
import Player from './views/Player.vue'
import Monsters from './views/Monsters.vue'
import Inn from './views/Inn.vue'
import City from './views/City.vue'
import Location from './views/Location.vue'
import Forge from './views/Forge.vue'
import Market from './views/Market.vue'
import World from './views/World.vue'

import translation from './services/translation'
import authentication from './services/authentication'
import notification from './services/notification'

// router
Vue.use(VueRouter);

// i18n
Vue.use(VueInternalization);
Vue.config.lang = 'es';
Object.keys(translation).forEach(function (lang) {
  Vue.locale(lang, translation[lang]);
});

// custom i18n filter
Vue.filter('i18n', function(string) {
  return Vue.t(string);
});

// socketio
Vue.use(VueSocketio, constants.socket);

// routes
var router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/world', component: World, name: 'world' },
    { path: '/items', component: Items, name: 'items' },
    { path: '/market', component: Market, name: 'market' },
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
    { path: '*', redirect: '/home' }
  ]
});

// secured routes
var secured = [
  'world',
  'player',
  'city',
  'inn',
  'market',
  'location',
  'forge'
];

// app
new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');

// redirect to home if not authentication
router.beforeEach((to, from, next) => {
  if ((secured.indexOf(to.name) !== -1) && !authentication.logged) {
    router.push({ path: '/' });
    notification.danger(Vue.t('alert.login.secure'));
  } else {
    return next();
  }
});