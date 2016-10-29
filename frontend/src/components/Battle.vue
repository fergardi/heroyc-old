<template lang="pug">
  #Battle
    .row
      .col-xs-12
        .page-header
          h1 Battle 
            small Kick ass
    .row
      .col-md-4.col-xs-6
        .panel.panel-default.text-center.animated(v-bind:class='{ flash: states.player.magic }')
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg.fa-user
              span {{player.name}}
          .panel-body
            img.thumbnail.slot(v-bind:src='"dist/img/player/" + player.image + ".png"', data-toggle='tooltip', v-bind:title='player.name')
            hr
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + vitality + "%"')
            .progress
              .progress-bar.progress-bar-primary(v-bind:style='"width: " + intelligence + "%"')
          .panel-buttons
            #parent
              .panel.list-group
                a.list-group-item(data-toggle='collapse', data-target='#attack', data-parent='#parent')
                  i.fa.fa-fw.fa-lg.fa-crosshairs
                  span Attack
                #attack.sublinks.collapse
                  a.list-group-item(@click='melee(strength)', v-bind:class='{disabled: states.buttons}')
                    img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon + ".png"')
                    span Melee
                    span.label.label-danger {{strength}}
                  a.list-group-item(@click='distance(strength / 2)', v-bind:class='{disabled: states.buttons}')
                    img.icon(v-bind:src='"dist/img/items/bow/" + player.bow + ".png"')
                    span Distance
                    span.label.label-danger {{strength / 2}}
                a.list-group-item(data-toggle='collapse', data-target='#magic', data-parent='#parent')
                  i.fa.fa-fw.fa-lg.fa-magic
                  span Magic
                #magic.sublinks.collapse
                  a.list-group-item(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, {disabled: states.buttons}]', @click='magic(spell.damage, spell.heal, spell.mana)')
                    img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                    span {{spell.name}}
                    span.label.label-danger {{spell.damage}}
                    span.label.label-primary {{spell.mana}}
                    span.label.label-success {{spell.heal}}
      .col-md-4.col-md-offset-4.col-xs-6
        .panel.text-center.animated(v-bind:class='[{ flash: states.monster.melee }, { bounce: states.monster.distance }, { shake: states.monster.magic }, { zoomOut: states.monster.dead }, "panel-" + monster.type]')
          .panel-heading
            .panel-title
              span {{monster.name}}
          .panel-body
            img.thumbnail.slot(v-bind:src='"dist/img/monsters/" + monster.image + ".png"', data-toggle='tooltip', v-bind:title='monster.name')
            hr
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + monster.vitality + "%"')
          .panel-buttons
            .list-group.panel
              a.list-group-item.disabled 
                i.fa.fa-fw.fa-lg.fa-crosshairs
                span Attack
              a.list-group-item.disabled
                i.fa.fa-fw.fa-lg.fa-magic
                span Magic
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Battle',
    data: function() { 
      return {
        player: {
          level: 0,
          name: '',
          image: 'avatar',
          weapon: 'novice',
          bow: 'novice',
          items: [],
          spells: []
        },
        monster: {
          name: '',
          image: 'skeleton',
          spells: [],
          type: '',
          vitality: 0,
          intelligence: 0,
          strength: 0,
          defense: 0,
          agility: 0
        },
        states: {
          buttons: false,
          monster: {
            melee: false,
            distance: false,
            magic: false,
            dead: false
          },
          player: {
            melee: false,
            distance: false,
            magic: false,
            dead: false
          }
        }
      }
    },
    created: function() {
      self = this;
      factory.getPlayer((data) => {
        self.player.level = data.level;
        self.player.items = data.Items;
        self.player.spells = data.Spells;
        self.player.image = data.image;
        self.player.name = data.name;
      });
      factory.getBattle((data) => {
        self.monster.spells = data.Monster.Spells;
        self.monster.image = data.Monster.image;
        self.monster.name = data.Monster.name;
        self.monster.vitality = data.Monster.vitality;
        self.monster.intelligence = data.Monster.intelligence;
        self.monster.strength = data.Monster.strength;
        self.monster.defense = data.Monster.defense;
        self.monster.agility = data.Monster.agility;
        self.monster.type = data.Monster.type;
      });
    },
    watch: {
      'monster.vitality': function(value) {
        if(value <= 0) {
          setTimeout(function() {
            self.states.monster.dead = true;
          }, 1500);
        }
      },
      'player.vitality': function(value) {
        if(value <= 0) {
          setTimeout(function() {
            self.states.player.dead = true;
          }, 1500);
        }
      }
    },
    methods: {
      melee: function(dmg) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          self.states.monster.melee = true;
          notification.warning('Melee attack!');
          setTimeout(function(){
            self.states.buttons = false;
            self.states.monster.melee = false;
            self.monster.vitality -= dmg;
          }, 1500);
        }
      },
      distance: function(dmg) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          self.states.monster.distance = true;
          notification.danger('Distance attack!');
          setTimeout(function(){
            self.states.buttons = false;
            self.states.monster.distance = false;
            self.monster.vitality -= dmg;
          }, 1500);  
        }
      },
      magic: function(dmg, heal, mana) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          dmg === 0 ? self.states.player.magic = true : self.states.monster.magic = true;
          notification.info('Magic attack!');
          setTimeout(function(){
            self.states.buttons = false;
            dmg === 0 ? self.states.player.magic = false : self.states.monster.magic = false;
            dmg === 0 ? self.player.vitality += heal : self.monster.vitality -= dmg;
            self.player.mana -= mana;
          }, 1500);  
        }
      }
    },
    computed: {
      strength: function() {
        var str = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          str += self.equiped[i].strength;
        }
        return str;
      },
      vitality: function() {
        var vit = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          vit += self.equiped[i].vitality;
        }
        return vit;
      },
      intelligence: function() {
        var int = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          int += self.equiped[i].intelligence;
        }
        return int;
      },
      agility: function() {
        var agi = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          agi += self.equiped[i].agility;
        }
        return agi;
      },
      defense: function() {
        var def = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          def += self.equiped[i].defense;
        }
        return def;
      },
      equiped: function() {
        return this.player.items.filter(function(item) {
          return item.PlayerItem.equiped;
        });
      }
    }
  }
</script>

<style scoped>
</style>