<template lang="pug">
  div#Player
    .row
      .col-xs-12
        .page-header
          h1 Player 
            small Your character
      .col-md-4.col-xs-12
        .panel.panel-default.text-center
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg.fa-user
              span {{name}} 
              label.badge {{level}}
          .panel-body
            img.thumbnail.slot(v-bind:src='"dist/img/player/" + image + ".png"', data-toggle='tooltip', v-bind:title='name')
            hr
            .progress
              .progress-bar.progress-bar-default(v-bind:style='"width: " + experience * 100 / (level * 1000) + "%"')
            .progress
              .progress-bar.progress-bar-warning(v-bind:style='"width: " + strength + "%"')
            .progress
              .progress-bar.progress-bar-primary(v-bind:style='"width: " + intelligence + "%"')
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + vitality + "%"')
            .progress
              .progress-bar.progress-bar-success(v-bind:style='"width: " + agility + "%"')
            .progress
              .progress-bar.progress-bar-info(v-bind:style='"width: " + defense + "%"')
            hr
            .row
              .col-md-4.col-xs-12(v-for='spell in spells')
                img.thumbnail.slot(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"', v-bind:class='"panel-" + spell.family', data-toggle='tooltip', v-bind:title='spell.name')
                .progress
                  .progress-bar.progress-bar-danger(v-bind:style='"width: " + spell.damage * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-success(v-bind:style='"width: " + spell.heal * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-primary(v-bind:style='"width: " + spell.mana * 10 + "%"')
      .col-md-4.col-xs-12
        .panel.panel-default.text-center
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg.fa-wrench
              span Equipment 
              label.badge {{items.length}}
          .panel-body
            .row
              .col-md-4.col-xs-12(v-for='equipment in equipments')
                img.thumbnail.slot(v-bind:src='"dist/img/items/" + equipment.type + "/" + equipment.image + ".png"', v-bind:class='"panel-" + equipment.rarity', data-toggle='tooltip', v-bind:title='equipment.name')
                .progress
                  .progress-bar.progress-bar-warning(v-bind:style='"width: " + equipment.strength * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-primary(v-bind:style='"width: " + equipment.intelligence * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-danger(v-bind:style='"width: " + equipment.vitality * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-success(v-bind:style='"width: " + equipment.agility * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-info(v-bind:style='"width: " + equipment.defense * 10 + "%"')
            hr
            .row
              .col-md-4.col-xs-12(v-for='item in items')
                img.thumbnail.slot.equip(v-bind:src='"dist/img/items/" + item.type + "/" + item.image + ".png"', v-bind:class='"panel-" + item.rarity', data-toggle='tooltip', v-bind:title='item.name', @click='equip(item)')
                .progress
                  .progress-bar.progress-bar-warning(v-bind:style='"width: " + item.strength * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-primary(v-bind:style='"width: " + item.intelligence * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-danger(v-bind:style='"width: " + item.vitality * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-success(v-bind:style='"width: " + item.agility * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-info(v-bind:style='"width: " + item.defense * 10 + "%"')
      .col-md-4.col-xs-12
        .panel.panel-default.text-center
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg.fa-diamond
              span Resources 
              label.badge {{resources.length}}
          .panel-body
            .row
              .col-md-4.col-xs-12(v-for='resource in resources')
                img.thumbnail.slot(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity', data-toggle='tooltip', v-bind:title='resource.name')
                label.badge {{resource.PlayerResource.quantity}}
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Player',
      data: function() {
        return {
          id: 0,
          name: '',
          items: [],
          equipments: [],
          spells: [],
          resources: [],
          image: 'avatar',
          level: 0,
          experience: 0,
          gold: 0
        }
      },
      created: function() {
        self = this;
        factory.getPlayer((data) => {
          self.id = data.id;
          self.equipments = data.Equipments;
          self.items = data.Items;
          self.spells = data.Spells;
          self.resources = data.Resources;
          self.name = data.name;
          self.level = data.level;
          self.experience = data.experience;
          self.gold = data.gold;
          self.image = data.image;
        });
      },
      methods: {
        equip: function(item) {
          factory.updateEquipment(self.id, item.id, (data) => {
            self.items = data.Items;
            notification.success('You equiped <strong>' + item.name + '</strong>');
          });
        }
      },
      computed: {
        strength: function() {
          var str = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            str += self.equipments[i].strength;
          }
          return str;
        },
        vitality: function() {
          var vit = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            vit += self.equipments[i].vitality;
          }
          return vit;
        },
        intelligence: function() {
          var int = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            int += self.equipments[i].intelligence;
          }
          return int;
        },
        agility: function() {
          var agi = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            agi += self.equipments[i].agility;
          }
          return agi;
        },
        defense: function() {
          var def = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            def += self.equipments[i].defense;
          }
          return def;
        }
      }
    }
</script>

<style scoped>

</style>
