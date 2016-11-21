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
    return parseFloat(-(Math.random() * (5.603843017110297 - 5.546525069080559) + 5.546525069080559).toFixed(10));
  },
  latitude () {
    return parseFloat((Math.random() * (42.55666577380774 - 42.61952832509911) + 42.61952832509911).toFixed(10));
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
      location.MonsterId = Math.floor(Math.random() * 19) + 1;
      location.experience = Math.ceil(Math.random() * 25);
      location.gold = Math.ceil(Math.random() * 10);
      switch (name) {
        case 'mine':
          location.ResourceId = Math.floor(Math.random() * 23) + 1;
          break;
        case 'dungeon':
          location.ItemId = Math.floor(Math.random() * 69) + 1;
          break;
        case 'tower':
          location.SpellId = Math.floor(Math.random() * 19) + 1;
          break;
        case 'castle':
          location.SkillId = Math.floor(Math.random() * 9) + 1;
          break;
        case 'ruins':
          location.RecipeId = Math.floor(Math.random() * 3) + 1;
          break;
      }
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