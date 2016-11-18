<template lang="pug">
  .container
    #Skills
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.skills' | i18n }} | 
              small {{ 'subtitle.skills' | i18n }}
      .row#title
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input#search(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.skills')")
      .row.equals
        .col-xs-12(v-if='!filtered.length')
          .well.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        .col-xs-3(v-for='skill in filtered')
          .panel.text-center(v-bind:class='"panel-" + skill.family')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + skill.icon')
                span {{ skill.name | i18n }} 
                span.label.label-warning {{ -skill.stamina }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/skills/" + skill.image + ".png"', v-bind:class='"panel-" + skill.family')
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
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Skills',
    data () { 
      return {
        filter: '',
        skills: [],
      }
    },
    created () {
      api.getSkills((data) => {
        this.skills = data;
      });
    },
    computed: {
      filtered () {
        return this.skills.filter((skill) => {
          return Vue.t(skill.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>