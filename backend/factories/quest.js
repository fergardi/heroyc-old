var factory = {
  names: ['Quest Example Name 1','Quest Example Name 2'],
  name () {
    return factory.names[Math.floor(Math.random() * factory.names.length)];
  },
  rarities: ['success', 'info', 'primary', 'danger', 'warning'],
  rarity () {
    return factory.rarities[Math.floor(Math.random() * factory.rarities.length)];
  },
  images: ['chest'],
  image () {
    return factory.images[Math.floor(Math.random() * factory.images.length)];
  },
  build (sequelize) {
    var quest = {
      icon: "torch",
      name: factory.name(),
      rarity: factory.rarity(),
      image: factory.image(),
      gold: Math.ceil(Math.random() * 10),
      platinum: Math.floor(Math.random() * 2),
      experience: Math.ceil(Math.random() * 25),
      Resources: [1,2,3]
    };
    if (sequelize) {
      quest = { model: "Quest", data: quest };
    }
    return quest;
  },
  bulk (quantity, sequelize) {
    var quests = [];
    for (var i = 0; i < quantity; i++) {
      quests.push(factory.build(sequelize));
    }
    return quests;
  }
}

module.exports = factory;