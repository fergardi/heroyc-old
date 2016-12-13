import constants from '../config/constants';

let url = constants.api;

var items = [];
var resources = [];
var recipes = [];
var spells = [];
var skills = [];
var monsters = [];
var packs = [];

const api = {
  getItems (callback) {
    if (items.length === 0) {
      $.get(`${url}/items`)
      .then((response) => {
        items = response;
        callback(response);
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
        resources = response;
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
        recipes = response;
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
        spells = response;
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
        skills = response;
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
        monsters = response;
        callback(monsters);
      });
    } else {
      callback(monsters);
    }
  },
  getSales (callback) {
    $.get(`${url}/sales`)
    .then((response) => {
      callback(response);
    });
  },
  buySale(player, sale, callback) {
    $.delete(`${url}/sales/${sale}/buy/${player}`)
    .then((response) => {
      callback(response);
    });
  },
  getMarket (callback) {
    $.get(`${url}/sales/market`)
    .then((response) => {
      callback(response);
    });
  },
  getPacks (callback) {
    if (packs.length === 0) {
      $.get(`${url}/packs`)
      .then((response) => {
        packs = response;
        callback(packs);
      });
    } else {
      callback(packs);
    }
  },
  buyPack(player, pack, callback) {
    
  },
  getLocations (callback) {
    $.get(`${url}/locations`)
    .then((response) => {
      callback(response);
    });
  },
  getLocation (id, callback) {
    $.get(`${url}/locations/${id}`)
    .then((response) => {
      callback(response);
    });
  },
  addLocation (callback) {
    $.post(`${url}/locations/add`)
    .then((response) => {
      callback(response);
    });
  },
  getPlayers (callback) {
    $.get(`${url}/players`)
    .then((response) => {
      callback(response);
    });
  },
  getPlayer (player, callback) {
    $.get(`${url}/players/${player}`)
    .then((response) => {
      callback(response);
    });
  },
  getQuests (callback) {
    $.get(`${url}/quests`)
    .then((response) => {
      callback(response);
    });
  },
  addQuest (player, quest) {
    $.post(`${url}/players/${player}/quests/add/${quest}`);
  },
  addGold (player, gold) {
    $.put(`${url}/players/${player}/gold/${gold}`);
  },
  addPlatinum (player, platinum) {
    $.put(`${url}/players/${player}/platinum/${platinum}`);
  },
  addExperience (player, experience) {
    $.put(`${url}/players/${player}/experience/${experience}`);
  },
  getEquipments (player, callback) {
    $.get(`${url}/players/${player}/equipments`)
    .then((response) => {
      callback(response);
    });
  },
  updateEquipment (player, item, callback) {
    $.put(`${url}/players/${player}/equipments/${item}`)
    .then((ok) => {
      $.get(`${url}/players/${player}`)
      .then((response) => {
        callback(response);
      })
    });
  },
  getAdvices (callback) {
    $.get(`${url}/advices`)
    .then((response) => {
      callback(response);
    });
  }
}

export default api;