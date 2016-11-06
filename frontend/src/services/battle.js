export const melee = function(states, location, dmg) {
  if (!states.buttons) {
    states.buttons = true;
    states.monster.melee = true;
    notification.danger('You inflicted <strong>-' + dmg + ' Vit</strong> to the <strong>' + location.Monster.name + '</strong>');
    setTimeout(function(){
      states.buttons = false;
      states.monster.melee = false;
      location.Monster.vitality -= dmg;
    }, constants.notification.duration);
  }
}

export const magic = function(states, location, player, name, dmg, heal, mana) {
  if (!states.buttons) {
    states.buttons = true;
    dmg === 0 ? states.player.magic = true : states.monster.magic = true;
    dmg === 0 ? notification.success('You healed <strong>+' + heal + ' Vit</strong>') : notification.info('You caused <strong>-' + dmg + ' Vit</strong> to the ' + location.Monster.name);
    setTimeout(function(){
      states.buttons = false;
      dmg === 0 ? states.player.magic = false : states.monster.magic = false;
      dmg === 0 ? player.vitality += heal : location.Monster.vitality -= dmg;
      player.mana -= mana;
    }, constants.notification.duration);  
  }
}

export const buff = function(states, location, player, name, vitality, strength, agility, intelligence, defense) {
  if (!states.buttons) {
    states.buttons = true;
    states.player.buff = true;
    notification.success('You buffed with <strong>' + name + '</strong>');
    setTimeout(function(){
      states.buttons = false;
      states.player.buff = false;
      player.vitality += vitality;
      player.strength += strength;
      player.agility += agility;
      player.intelligence += intelligence;
      player.defense += defense;
    }, constants.notification.duration);  
  }
}