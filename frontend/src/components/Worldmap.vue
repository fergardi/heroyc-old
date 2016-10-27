<template lang="pug">
  #Worldmap
    .map-container
      #map
</template>

<script>
  import {init} from '../services/map.js'
  export default {
    name: 'Worldmap',
    mounted () {
      this.$nextTick(function () {
        init();
      });
    }
  }
</script>

<style>
  #map {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }
  .map-location,
  .map-monster,
  .map-avatar {
    width: 60px;
    height: 60px;
    border-width: 4px;
  }
  .map-resource {
    width: 30px;
    height: 30px;
    border: none;
  }
  .map-location-shadow,
  .map-monster-shadow,
  .map-resource-shadow,
  .map-avatar-shadow {
    width: 20px;
    height: 7px;
    border-radius: 50%;
    background-color: black;
    opacity: .3;
    margin: 10px auto 0 auto;
  }
  .map-avatar {
    border-color: #f5f5f5;
    border-radius: 50%;
  }
  /* fade */
  .map-fade {
    opacity: .75;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    position: absolute;
    margin: auto;
    pointer-events: none;
    cursor: pointer;
  }
  .map-fade-day {
    background: linear-gradient(rgba(62, 228, 216, 1) 10%, transparent 20%) left repeat;
  }
  .map-fade-night {
    background: linear-gradient(black 30%, transparent 100%) left repeat;
  }
</style>