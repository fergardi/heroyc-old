let api = 'http://localhost:3000/api'

var items = [];
var resources = [];
var recipes = [];
var spells = [];

const factory = {
  getItems: function(callback) {
    if (items.length === 0) {
      $.get(`${api}/items`).then(function(response){
        items = response.data;
        callback(items);
      });
    } else {
      callback(items);
    }
  },
  getResources: function(callback) {
    if (resources.length === 0) {
      $.get(`${api}/resources`).then(function(response){
        resources = response.data;
        callback(resources);
      });
    } else {
      callback(resources);
    }
  },
  getRecipes: function(callback) {
    if (recipes.length === 0) {
      $.get(`${api}/recipes`).then(function(response){
        recipes = response.data;
        callback(recipes);
      });
    } else {
      callback(recipes);
    }
  },
  getSpells: function(callback) {
    if (spells.length === 0) {
      $.get(`${api}/spells`).then(function(response){
        spells = response.data;
        callback(spells);
      });
    } else {
      callback(spells);
    }
  },
  getSales: function(callback) {
    $.get(`${api}/sales`).then(function(response){
      callback(response.data);
    });
  },
  getPlayer: function(callback) {
    $.get(`${api}/players/1`).then(function(response){
      callback(response.data);
    });
  }
}

export default factory;