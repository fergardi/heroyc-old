var constants = require('../config/constants');

var factory = {
  good: ['inn', 'forge', 'city', 'market'],
  bad: ['mine', 'dungeon', 'castle', 'tower','ruins'],
  types () {
    return factory.good.concat(factory.bad);
  },
  type () {
    return factory.types()[Math.floor(Math.random() * factory.types().length)];
  },
  longitude () {
    return parseFloat(-(Math.random() * (constants.location.coordinates.longitude.max - constants.location.coordinates.longitude.min) + constants.location.coordinates.longitude.min).toFixed(10));
  },
  latitude () {
    return parseFloat((Math.random() * (constants.location.coordinates.latitude.max - constants.location.coordinates.latitude.min) + constants.location.coordinates.latitude.min).toFixed(10));
  },
  build (sequelize) {
    var name = factory.type();
    var location = {
      image: name,
      type: 'title.' + name,
      lat: factory.latitude(),
      lng: factory.longitude(),
    };
    if (factory.bad.indexOf(name) !== -1)  {
      location.MonsterId = Math.floor(Math.random() * constants.location.monsters) + 1;
      switch (name) {
        case 'mine':
          location.ResourceId = Math.floor(Math.random() * constants.location.resources) + 1;
          break;
        case 'dungeon':
          location.ItemId = Math.floor(Math.random() * constants.location.items) + 1;
          break;
        case 'tower':
          location.SpellId = Math.floor(Math.random() * constants.location.spells) + 1;
          break;
        case 'castle':
          location.SkillId = Math.floor(Math.random() * constants.location.skills) + 1;
          break;
        case 'ruins':
          location.RecipeId = Math.floor(Math.random() * constants.location.recipes) + 1;
          break;
      }
      location.experience = Math.ceil(Math.random() * constants.location.experience);
      location.gold = Math.ceil(Math.random() * constants.location.gold);
    }
    if (sequelize) {
      location = { model: "Location", data: location };
    }
    return location;
  },
  bulk (quantity, sequelize) {
    var locations = [];
    for (var i = 0; i < quantity; i++) {
      locations.push(factory.build(sequelize));
    }
    return locations;
  }
}

module.exports = factory;