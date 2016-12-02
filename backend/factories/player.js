var factory = {
  build (name) {
    var player = {
      name: name + '#' + Math.floor(1000 + Math.random() * 9000),
      level: 1,
      experience: 0,
      gold: 5,
      platinum: 1,
      image: 'avatar',
      Spells: [],
      Skills: [],
      Resources: [],
      Recipes: [],
      Quests: [],
      Items: [6, 7, 14, 19, 44, 46, 51, 59, 70],
      RingId: 6,
      HelmId: 7,
      NecklaceId: 14,
      WeaponId: 19,
      ArmorId: 44,
      ShieldId: 46,
      GlovesId: 51,
      BootsId: 59,
      PotionId: 70,
    };
    return player;
  }
}

module.exports = factory;