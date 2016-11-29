<template lang="pug">
  div.fullheight
    navbar
    .container.fixed
      .row
        .col-md-offset-6.col-md-6.col-xs-12.alerts
    transition(appear, appear-active-class="animated fadeIn router", enter-active-class="animated fadeIn router", leave-active-class="animated fadeOut router", mode="out-in")
      router-view
</template>

<script>
  import navbar from './views/Navbar.vue'
  export default {
    components: { navbar }
  }
</script>

<style lang="stylus">
  /* MAIN */
  html
  body
  .fullheight
    height: 100%;
  body
    background: url("https://s-media-cache-ak0.pinimg.com/originals/50/b0/31/50b03186899160af37b930057fe69c46.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    box-sizing: border-box;
    padding-top: 50px;
  .navbar
    margin-bottom: 0;
  *:not(.input-group-addon) > i
    margin-right: 5px;
  .label > i
    margin-right: 0;
  i.ra
  i.ra-lg
    line-height: inherit;
  .page-header
    margin: 23px 0;
  .bootstrap-select
    border-radius: 6px;
  .fixed
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9999;
    opacity: 0.95;
  .alert
    border: 1px solid black;
    margin-bottom: 5px;
    margin-top: 10px;
    pointer-events: all;
  .help-block
  .help-block > ul
    margin: 0;
  .progress
    margin-bottom: 5px;
    height: 5px;
  .progress-bar-default
    background-color: #212121;
  .progress-bar-default.progress-bar:last-child::before
    background-color: #f5f5f5;
  .slot
    margin-bottom: 5px;
  .alert
  .panel-heading
  .panel-body
  .btn
  .list-group
  .list-group-item
  .nav-pills li a
  .nav-tabs li a
    background-image: url("https://www.transparenttextures.com/patterns/dust.png");
    background-repeat: repeat;
  .thumbnail
    margin-bottom: 5px;
    display: inline-block;
  .page-header h1 small
    color: inherit;
  .map-container
    height: calc(100vh - 50px);
  .navbar-fixed-top .navbar-collapse
    max-height: calc(100vh - 50px);
  .icon
    width: 40px;
    padding-right: 10px;
  a.list-group-item-primary
    color: #2e64fe;
    background-color: #a9bcf5;
  a.list-group-item-primary:hover
    color: #00f;
    background-color: #2e64fe;
  span.label
    border: 1px solid #000;
  span.label + span.label
    margin-left: 2px;
  #title form
    display: inline-block;
    width: 100%;
  .pointer
    cursor: pointer;
  .vertical-align
    display: flex;
    align-items: center;
    justify-content: center;
  .mapboxgl-ctrl-attrib
    display: none;
  .disabled
    pointer-events: none;
  .page-header
    border-bottom: 1px solid;
  .round
    border-radius: 50%;
  .label
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-weight: bold;
    font-size: inherit;
    line-height: 1;
    vertical-align: baseline;
    white-space: nowrap;
    text-align: center;
    border-radius: 10px;
  .row.equals
    display: flex;
    flex-wrap: wrap;
  .row.equals > [class*='col-']
    display: flex;
    flex-direction: column;
  .row.equals > [class*='col-'] .panel
    height: 100%;
  .nav-pills li a
    background-color: #fff;
    color: #333333;
  .text-center
    text-align: center !important;
  ul.dropdown-menu
    padding: 0;
    
  /* RESPONSIVE */
  @media all and (max-width: 768px)
    *[class*='col-']
      padding-right: 5px;
      padding-left: 5px;
    .panel
      margin-bottom: 10px;
    .form-group
      margin-bottom: 5px;
    .panel-title
      font-size: 1em;
    .list-group-item
      padding-top: 5px;
      padding-bottom: 5px;
    #title
      margin-top: 10px;
      margin-bottom: 0px;
    #title form
      width: 100%;
    body
      font-size: 12px;
    .icon
      width: 25px;
      padding-right: 5px;
    button.navbar-toggle i
      color: #fff;
      margin-right: 0;
</style>