let url = '//localhost:3000/api'

var items = [];
var resources = [];
var recipes = [];
var spells = [];
var skills = [];
var monsters = [];

const api = {
  getItems: function(callback) {
    if (items.length === 0) {
      $.get(`${url}/items`)
      .then(function(response) {
        items = response.data;
        callback(items);
      });
    } else {
      callback(items);
    }
  },
  addItem: function(player, item) {
    $.post(`${url}/players/${player}/items/add/${item}`);
  },
  getResources: function(callback) {
    if (resources.length === 0) {
      $.get(`${url}/resources`)
      .then(function(response) {
        resources = response.data;
        callback(resources);
      });
    } else {
      callback(resources);
    }
  },
  addResource: function(player, resource, quantity) {
    $.post(`${url}/players/${player}/resources/add/${resource}/${quantity}`);
  },
  getRecipes: function(callback) {
    if (recipes.length === 0) {
      $.get(`${url}/recipes`)
      .then(function(response) {
        recipes = response.data;
        callback(recipes);
      });
    } else {
      callback(recipes);
    }
  },
  addRecipe: function(player, recipe) {
    $.post(`${url}/players/${player}/recipes/add/${recipe}`);
  },
  getSpells: function(callback) {
    if (spells.length === 0) {
      $.get(`${url}/spells`)
      .then(function(response) {
        spells = response.data;
        callback(spells);
      });
    } else {
      callback(spells);
    }
  },
  addSpell: function(player, spell) {
    $.post(`${url}/players/${player}/spells/add/${spell}`);
  },
  getSkills: function(callback) {
    if (skills.length === 0) {
      $.get(`${url}/skills`)
      .then(function(response) {
        skills = response.data;
        callback(skills);
      });
    } else {
      callback(skills);
    }
  },
  addSkill: function(player, skill) {
    $.post(`${url}/players/${player}/skills/add/${skill}`);
  },
  getMonsters: function(callback) {
    if (monsters.length === 0) {
      $.get(`${url}/monsters`)
      .then(function(response) {
        monsters = response.data;
        callback(monsters);
      });
    } else {
      callback(monsters);
    }
  },
  getSales: function(callback) {
    $.get(`${url}/sales`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getLocations: function(callback) {
    $.get(`${url}/locations`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getLocation: function(id, callback) {
    $.get(`${url}/locations/${id}`)
    .then(function(response) {
      callback(response.data);
    });
  },
  addLocation: function(callback) {
    $.post(`${url}/locations/add`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getPlayers: function(callback) {
    $.get(`${url}/players`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getPlayer: function(player, callback) {
    $.get(`${url}/players/${player}`)
    .then(function(response) {
      callback(response.data);
    });
  },
  getQuests: function(callback) {
    $.get(`${url}/quests`)
    .then(function(response) {
      callback(response.data);
    });
  },
  addQuest: function(player, quest) {
    $.post(`${url}/players/${player}/quests/add/${quest}`);
  },
  updateEquipment: function(player, item, callback) {
    $.put(`${url}/players/${player}/equipments/${item}`)
    .then(function(ok) {
      $.get(`${url}/players/${player}`)
      .then(function(response){
        callback(response.data);
      })
    });
  }
}

export default api;