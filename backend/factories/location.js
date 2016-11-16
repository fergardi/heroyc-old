var factory = {
  types: ['mine', 'dungeon', 'castle', 'inn', 'forge', 'tower', 'city', 'ruins', 'market'],
  type () {
    return factory.types[Math.floor(Math.random() * factory.types.length)];
  },
  longitude () {
    return parseFloat(-(Math.random() * (5.603843017110297 - 5.546525069080559) + 5.546525069080559).toFixed(10));
  },
  latitude () {
    return parseFloat((Math.random() * (42.55666577380774 - 42.61952832509911) + 42.61952832509911).toFixed(10));
  },
  build () {
    var name = factory.type();
    var location = {
      image: name,
      type: 'title.' + name,
      lat: factory.latitude(),
      lng: factory.longitude(),
    };
    switch (location.image) {
      case 'mine':
      case 'dungeon':
      case 'tower':
      case 'castle':
      case 'ruins':
        location.MonsterId = Math.ceil(Math.random() * 20);
        switch (Math.ceil(Math.random() * 5)) {
          case 0:
            location.SpellId = Math.ceil(Math.random() * 20);
            break;
          case 1:
            location.SkillId = Math.ceil(Math.random() * 10);
            break;
          case 2:
            location.RecipeId = Math.ceil(Math.random() * 4);
            break;
          case 3:
            location.ResourceId = Math.ceil(Math.random() * 24);
            break;
          case 4:
            location.ItemId = Math.ceil(Math.random() * 70);
            break;
        }
        break;
    }
    return location;
  },
  bulk (quantity) {
    var locations = [];
    for (var i = 0; i < quantity; i++) {
      locations.push(factory.build());
    }
    return locations;
  }
}

module.exports = factory;