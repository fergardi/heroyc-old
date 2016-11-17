let url = constants.api;

var items = [];
var resources = [];
var recipes = [];
var spells = [];
var skills = [];
var monsters = [];

const api = {
  getItems (callback) {
    if (items.length === 0) {
      $.get(`${url}/items`)
      .then((response) => {
        items = response.data;
        callback(items);
      });
    } else {
      callback(items);
    }
  },
  addItem (player, item) {
    $.post(`${url}/players/${player}/items/add/${item}`);
  },
  getResources (callback) {
    if (resources.length === 0) {
      $.get(`${url}/resources`)
      .then((response) => {
        resources = response.data;
        callback(resources);
      });
    } else {
      callback(resources);
    }
  },
  addResource (player, resource, quantity) {
    $.post(`${url}/players/${player}/resources/add/${resource}/${quantity}`);
  },
  getRecipes (callback) {
    if (recipes.length === 0) {
      $.get(`${url}/recipes`)
      .then((response) => {
        recipes = response.data;
        callback(recipes);
      });
    } else {
      callback(recipes);
    }
  },
  addRecipe (player, recipe) {
    $.post(`${url}/players/${player}/recipes/add/${recipe}`);
  },
  getSpells (callback) {
    if (spells.length === 0) {
      $.get(`${url}/spells`)
      .then((response) => {
        spells = response.data;
        callback(spells);
      });
    } else {
      callback(spells);
    }
  },
  addSpell (player, spell) {
    $.post(`${url}/players/${player}/spells/add/${spell}`);
  },
  getSkills (callback) {
    if (skills.length === 0) {
      $.get(`${url}/skills`)
      .then((response) => {
        skills = response.data;
        callback(skills);
      });
    } else {
      callback(skills);
    }
  },
  addSkill (player, skill) {
    $.post(`${url}/players/${player}/skills/add/${skill}`);
  },
  getMonsters (callback) {
    if (monsters.length === 0) {
      $.get(`${url}/monsters`)
      .then((response) => {
        monsters = response.data;
        callback(monsters);
      });
    } else {
      callback(monsters);
    }
  },
  getSales (callback) {
    $.get(`${url}/sales`)
    .then((response) => {
      callback(response.data);
    });
  },
  getMarket (callback) {
    $.get(`${url}/sales/market`)
    .then((response) => {
      callback(response.data);
    });
  },
  getLocations (callback) {
    $.get(`${url}/locations`)
    .then((response) => {
      callback(response.data);
    });
  },
  getLocation (id, callback) {
    $.get(`${url}/locations/${id}`)
    .then((response) => {
      callback(response.data);
    });
  },
  addLocation (callback) {
    $.post(`${url}/locations/add`)
    .then((response) => {
      callback(response.data);
    });
  },
  getPlayers (callback) {
    $.get(`${url}/players`)
    .then((response) => {
      callback(response.data);
    });
  },
  getPlayer (player, callback) {
    $.get(`${url}/players/${player}`)
    .then((response) => {
      callback(response.data);
    });
  },
  getQuests (callback) {
    $.get(`${url}/quests`)
    .then((response) => {
      callback(response.data);
    });
  },
  addQuest (player, quest) {
    $.post(`${url}/players/${player}/quests/add/${quest}`);
  },
  getEquipments (player, callback) {
    $.get(`${url}/players/${player}/equipments`)
    .then((response) => {
      callback(response.data);
    });
  },
  updateEquipment (player, item, callback) {
    $.put(`${url}/players/${player}/equipments/${item}`)
    .then((ok) => {
      $.get(`${url}/players/${player}`)
      .then((response) => {
        callback(response.data);
      })
    });
  }
}

export default api;