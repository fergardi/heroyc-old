<template lang="pug">
  .container
    #Player
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 Player 
              small Character
      .row#character
        .col-md-6.col-xs-6
          .panel.panel-default.text-center
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span {{name}} 
                label.badge {{level}}
            .panel-body
              .row.vertical-align
                .col-xs-4
                  img.thumbnail.slot(v-bind:src='"dist/img/player/" + image + ".png"', data-toggle='tooltip', v-bind:title='name')
                .col-xs-8
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
                  .progress
                    .progress-bar.progress-bar-default(v-bind:style='"width: " + experience * 100 / (level * 1000) + "%"')
        .col-md-6.col-xs-6
          .panel-group(id='parent')
            .panel.panel-warning.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', data-parent='#parent', href='#inventory')
                  i.fa.fa-fw.fa-lg.fa-sitemap
                  span Inventory 
                  label.badge 9
              .panel-collapse.collapse(id='inventory')
                .panel-body
                  .row
                    .col-xs-4(v-for='equipment in equipments')
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
            .panel.panel-success.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', data-parent='#parent', href='#items')
                  i.ra.ra-fw.ra-lg.ra-crossed-axes
                  span Items 
                  label.badge {{items.length}}
              .panel-collapse.collapse(id='items')
                .panel-body
                  .row
                    .col-xs-4(v-for='item in items')
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
            .panel.panel-primary.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', data-parent='#parent', href='#resources')
                  i.ra.ra-fw.ra-lg.ra-gold-bar
                  span Resources 
                  label.badge {{resources.length}}
              .panel-collapse.collapse(id='resources')
                .panel-body
                  .row
                    .col-xs-4(v-for='resource in resources')
                      img.thumbnail.slot(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity', data-toggle='tooltip', v-bind:title='resource.name')
                      br
                      label.badge {{resource.PlayerResource.quantity}}
            .panel.panel-info.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', data-parent='#parent', href='#spells')
                  i.ra.ra-fw.ra-lg.ra-crystal-wand
                  span Spells & Skills 
                  label.badge {{spells.length + skills.length}}
              .panel-collapse.collapse(id='spells')
                .panel-body
                  .row
                    .col-xs-4(v-for='spell in spells')
                      img.thumbnail.slot(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"', v-bind:class='"panel-" + spell.family', data-toggle='tooltip', v-bind:title='spell.name')
                      .progress
                        .progress-bar.progress-bar-danger(v-bind:style='"width: " + spell.damage * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-success(v-bind:style='"width: " + spell.heal * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-primary(v-bind:style='"width: " + spell.mana * 10 + "%"')
                  hr
                  .row
                    .col-xs-4(v-for='skill in skills')
                      img.thumbnail.slot(v-bind:src='"dist/img/skills/" + skill.image + ".png"', v-bind:class='"panel-" + skill.family', data-toggle='tooltip', v-bind:title='skill.name')
                      .progress
                        .progress-bar.progress-bar-warning(v-bind:style='"width: " + skill.strength * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-primary(v-bind:style='"width: " + skill.intelligence * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-danger(v-bind:style='"width: " + skill.vitality * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-success(v-bind:style='"width: " + skill.agility * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-info(v-bind:style='"width: " + skill.defense * 10 + "%"')
            .panel.panel-danger.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', data-parent='#parent', href='#quests')
                  i.ra.ra-fw.ra-lg.ra-crystal-wand
                  span Quests 
                  label.badge ?
              .panel-collapse.collapse(id='quests')
                .panel-body
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Player',
      data: function() {
        return {
          id: 1,
          name: '',
          items: [],
          equipments: [],
          spells: [],
          skills: [],
          resources: [],
          image: 'avatar',
          level: 0,
          experience: 0,
          gold: 0
        }
      },
      created: function() {
        self = this;
        factory.getPlayer(1, (data) => {
          self.id = data.id;
          self.equipments = data.Equipments;
          self.items = data.Items;
          self.spells = data.Spells;
          self.skills = data.Skills;
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
            self.equipments = data.Equipments;
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

<style lang="stylus" scoped>
  .panel-heading .accordion-toggle:after
    font: normal normal normal 14px/1 FontAwesome;
    content: "\f078";
    float: right;
    font-size: 1em;
    line-height: 1em;
  .panel-heading .accordion-toggle.collapsed:after
    content: "\f054";
</style>