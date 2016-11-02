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
  getBattles: function(callback) {
    $.get(`${api}/battles`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getBattle: function(callback) {
    $.get(`${api}/battles/1`)
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
  getPlayer: function(callback) {
    $.get(`${api}/players/1`)
    .then(function(response) {
      callback(response.data);
    });
  },
  updateEquipment: function(player, item, callback) {
    $.put(`${api}/players/${player}/item/equip/${item}`)
    .then(function(response) {
      callback(response.data);
    });
  },
  addItem: function(player, item, callback) {
    $.post(`${api}/players/${player}/item/add/${item}`)
    .then(function(response) {
      callback(response.data);
    });
  },
  addResource: function(player, resource, callback) {
    $.post(`${api}/players/${player}/resource/add/${resource}`)
    .then(function(response) {
      callback(response.data);
    });
  }
}

export default factory;