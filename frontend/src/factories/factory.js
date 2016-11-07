let api = '//192.168.0.11:3000/api'

var items = [];
var resources = [];
var recipes = [];
var spells = [];
var skills = [];
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
  addItem: function(player, item) {
    $.post(`${api}/players/${player}/items/add/${item}`);
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
  addResource: function(player, resource, quantity) {
    $.post(`${api}/players/${player}/resources/add/${resource}/${quantity}`);
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
  addRecipe: function(player, recipe) {
    $.post(`${api}/players/${player}/recipes/add/${recipe}`);
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
  addSpell: function(player, spell) {
    $.post(`${api}/players/${player}/spells/add/${spell}`);
  },
  getSkills: function(callback) {
    if (skills.length === 0) {
      $.get(`${api}/skills`)
      .then(function(response) {
        skills = response.data;
        callback(skills);
      });
    } else {
      callback(skills);
    }
  },
  addSkill: function(player, skill) {
    $.post(`${api}/players/${player}/skills/add/${skill}`);
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
  addLocation: function(callback) {
    $.post(`${api}/locations/add`)
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
  getQuests: function(callback) {
    $.get(`${api}/quests`)
    .then(function(response) {
      callback(response.data);
    });
  },
  addQuest: function(player, quest) {
    $.post(`${api}/players/${player}/quests/add/${quest}`);
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
}

export default factory;