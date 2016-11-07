const battle = {
  melee: function(damage) {
    if (!self.states.buttons) {
      self.states.buttons = true;
      self.states.monster.melee = true;
      notification.danger('You inflicted <strong>-' + damage + ' Vit</strong> to the <strong>' + self.location.Monster.name + '</strong>');
      setTimeout(function(){
        self.states.buttons = false;
        self.states.monster.melee = false;
        self.location.Monster.vitality -= damage;
      }, constants.notification.duration);
    }
  },
  magic: function(spell) {
    if (!self.states.buttons) {
      self.states.buttons = true;
      self.player.intelligence -= spell.mana;
      if (spell.damage === 0) {
        self.states.player.magic = true;
        notification.success('You healed <strong>+' + spell.heal + ' Vit</strong>');
        setTimeout(function(){
          self.states.buttons = false;
          self.states.player.magic = false;
          self.player.vitality += spell.heal;
        }, constants.notification.duration);
      } else {
        self.states.monster.magic = true;
        notification.info('You caused <strong>-' + spell.damage + ' Vit</strong> to the ' + self.location.Monster.name);
        setTimeout(function(){
          self.states.buttons = false;
          self.states.monster.magic = false;
          self.location.Monster.vitality -= spell.damage;
        }, constants.notification.duration);
      }
    }
  },
  buff: function(skill) {
    if (!self.states.buttons) {
      self.states.buttons = true;
      self.states.player.buff = true;
      notification.success('You buffed yourself with <strong>' + skill.name + '</strong>');
      setTimeout(function(){
        self.states.buttons = false;
        self.states.player.buff = false;
        self.player.vitality += skill.vitality;
        self.player.strength += skill.strength;
        self.player.agility += skill.agility;
        self.player.intelligence += skill.intelligence;
        self.player.defense += skill.defense;
      }, constants.notification.duration);  
    }
  },
  strength: function() {
    var str = self.player.level;
    for(var i = 0; i < self.player.equipments.length; i++) {
      str += self.player.equipments[i].strength;
    }
    return str;
  },
  vitality: function() {
    var vit = self.player.level;
    for(var i = 0; i < self.player.equipments.length; i++) {
      vit += self.player.equipments[i].vitality;
    }
    return vit;
  },
  intelligence: function() {
    var int = self.player.level;
    for(var i = 0; i < self.player.equipments.length; i++) {
      int += self.player.equipments[i].intelligence;
    }
    return int;
  },
  agility: function() {
    var agi = self.player.level;
    for(var i = 0; i < self.player.equipments.length; i++) {
      agi += self.player.equipments[i].agility;
    }
    return agi;
  },
  defense: function() {
    var def = self.player.level;
    for(var i = 0; i < self.player.equipments.length; i++) {
      def += self.player.equipments[i].defense;
    }
    return def;
  }
}

export default battle;