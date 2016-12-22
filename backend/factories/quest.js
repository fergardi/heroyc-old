var factory = {
  classes: ['success', 'info', 'primary', 'danger', 'warning'],
  class () {
    return factory.classes[Math.floor(Math.random() * factory.classes.length)];
  },
  images: ['chest','bone','key','map','mirror','scroll','telescope','torch'],
  image () {
    return factory.images[Math.floor(Math.random() * factory.images.length)];
  },
  build (sequelize) {
    var res = [];
    while(res.length < 3) {
      var num = Math.floor(Math.random() * 23) + 1;
      if (res.indexOf(num) === -1) {
        res.push(num);
      }
    }
    var image = factory.image();
    var quest = {
      icon: 'torch',
      name: 'quest.' + image,
      class: factory.class(),
      image: image,
      gold: Math.ceil(Math.random() * 10),
      platinum: Math.floor(Math.random() * 2),
      experience: Math.ceil(Math.random() * 25),
      Resources: res
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