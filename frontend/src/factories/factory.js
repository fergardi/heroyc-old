let api = 'http://localhost:3000/api'

var items = [];
var resources = [];
var recipes = [];
var spells = [];
var monsters = [];

const factory = {
  getItems: function(callback) {
    if (items.length === 0) {
      $.get(`${api}/items`)
      .then(function(response) {
        items = response.data;
        callback(items);
      });
    } else {
      callback(items);
    }
  },
  getResources: function(callback) {
    if (resources.length === 0) {
      $.get(`${api}/resources`)
      .then(function(response) {
        resources = response.data;
        callback(resources);
      });
    } else {
      callback(resources);
    }
  },
  getRecipes: function(callback) {
    if (recipes.length === 0) {
      $.get(`${api}/recipes`)
      .then(function(response) {
        recipes = response.data;
        callback(recipes);
      });
    } else {
      callback(recipes);
    }
  },
  getSpells: function(callback) {
    if (spells.length === 0) {
      $.get(`${api}/spells`)
      .then(function(response) {
        spells = response.data;
        callback(spells);
      });
    } else {
      callback(spells);
    }
  },
  getMonsters: function(callback) {
    if (monsters.length === 0) {
      $.get(`${api}/monsters`)
      .then(function(response) {
        monsters = response.data;
        callback(monsters);
      });
    } else {
      callback(monsters);
    }
  },
  getSales: function(callback) {
    $.get(`${api}/sales`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getLocations: function(callback) {
    $.get(`${api}/locations`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getLocation: function(id, callback) {
    $.get(`${api}/locations/${id}`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getPlayers: function(callback) {
    $.get(`${api}/players`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getPlayer: function(player, callback) {
    $.get(`${api}/players/${player}`)
    .then(function(response) {
      callback(response.data);
    });
  },
  updateEquipment: function(player, item, callback) {
    $.put(`${api}/players/${player}/equipments/${item}`)
    .then(function(ok) {
      $.get(`${api}/players/${player}`)
      .then(function(response){
        callback(response.data);
      })
    });
  },
  addItem: function(player, item) {
    $.post(`${api}/players/${player}/items/add/${item}`);
  },
  addResource: function(player, resource, quantity) {
    $.post(`${api}/players/${player}/resources/add/${resource}/${quantity}`);
  }
}

export default factory;