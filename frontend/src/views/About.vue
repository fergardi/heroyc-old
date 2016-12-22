<template lang="pug">
  .container
    #About
      .row
        .col-xs-12
          .page-header
            h1 {{ 'title.about' | i18n }} | 
              small {{ 'subtitle.about' | i18n }}
      .row#title
        .col-md-3.col-xs-4
          .panel.panel-warning.text-center
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span hola
            .panel-body
              span adios
        .col-md-3.col-xs-4
          .panel.panel-warning.text-center
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span hola
            .panel-body
              span adios
        .col-md-3.col-xs-4
          .panel.panel-warning.text-center
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span hola
            .panel-body
              span adios
        .col-md-3.col-xs-4
          .panel.panel-warning.text-center
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span hola
            .panel-body
              span adios
</template>

<script>
  export default {
    name: 'About'
  }
</script>

<style lang="stylus" scoped>
</style>