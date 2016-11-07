<template lang="pug">
  #World
    .map-container
      #map
</template>

<script>
  import factory from '../factories/factory.js'
  export default {
    name: 'World',
    data: function() {
      return {
        locations: [],
        map: {},
        current: {},
        options: {
          zoom: 15,
          center: [-5.56, 42.60],
          pitch: 0,
          token: 'pk.eyJ1IjoiZmVyZ2FyZGkiLCJhIjoiY2lxdWl1enJiMDAzaWh4bTNwY3F6MnNwdiJ9.fPkJoOfrARPtZWCj1ehyCQ',
          style: 'mapbox://styles/fergardi/cirymo82r004jgym6lh1lkgo5'
        },
        avatar: null
      }
    },
    mounted: function() {
      self = this;
      self.createMap();
      self.geoLocate();
      factory.getLocations((data) => {
        self.locations = data;
        for (var i = 0; i < self.locations.length; i++) {
          self.addLocation(self.locations[i]);
        }
      });
    },
    methods: {
      createMap: function() {
        mapboxgl.accessToken = self.options.token;
        self.map = new mapboxgl.Map({
          container: 'map',
          style: self.options.style,
          pitch: self.options.pitch,
          zoom: self.options.zoom,
          center: self.options.center,
          attributionControl: { position: 'bottom-left' }
        });
      },
      geoLocate: function() {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            if (self.avatar === null) self.move(position.coords.longitude, position.coords.latitude);
            self.current = position;
            self.updatePosition(new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude));
          }
        );
      },
      move: function(lng, lat) {
        self.map.flyTo({
          center: [lng, lat],
          speed: 1,
          curve: 1,
          zoom: self.options.zoom
        });
      },
      updatePosition: function(location) {
        if (self.avatar === null) {
          var marker = document.createElement('div');
          marker.style.zIndex = 10;
          marker.style.left = -30 + 'px';
          marker.style.top = -77 + 'px';
          // add an icon
          var icon = document.createElement('img');
          icon.src = 'dist/img/player/avatar.png';
          icon.className = 'map-avatar animated bounce infinite';
          marker.appendChild(icon);
          // add a shadow
          var shadow = document.createElement('div');
          shadow.className = 'map-avatar-shadow';
          marker.appendChild(shadow);
          marker.addEventListener('click', function(event) {
            self.$router.push({ name: 'player' });
          });
          // add marker to map
          self.avatar = new mapboxgl.Marker(marker).setLngLat(location).addTo(self.map);
        } else {
          // move marker in map
          self.avatar.setLngLat(location);
        }
      },
      addLocation: function(location) {
        var icon = document.createElement('img');
        icon.src = 'dist/img/locations/' + location.image + '.png';
        icon.className = 'map-location';
        var marker = document.createElement('div');
        marker.id = location.id;
        marker.style.zIndex = 5;
        marker.style.width = icon.naturalWidth + 'px';
        marker.style.height = icon.naturalHeight + 'px';
        marker.style.left = -icon.naturalWidth/2 + 'px';
        marker.style.top = -icon.naturalHeight + 'px';
        marker.appendChild(icon);
        marker.addEventListener('click', function(event) {
          switch(location.image){
            case 'city':
              self.$router.push({ name: 'city' });
              break;
            case 'forge':
              self.$router.push({ name: 'forge' });
              break;
            case 'inn':
              self.$router.push({ name: 'inn' });
              break;
            case 'dungeon':
            case 'tower':
            case 'mine':
            case 'ruins':
            case 'castle':
              self.$router.push({ name: 'location', params: { locationId: location.id }});
              break;
          }
        });
        new mapboxgl.Marker(marker).setLngLat([location.lat, location.lng]).addTo(self.map);
      }
    }
  }
</script>

<style lang="stylus">
  #map
    width: 100%;
    height: 100%;
    min-height: 100%;
  .mapboxgl-canvas
    height: 100% !important;
  .map-location
    width: 100%;
  .map-avatar
    width: 60px;
    height: 60px;
    border-radius: 50%;
  .map-avatar-shadow
    width: 20px;
    height: 7px;
    border-radius: 50%;
    background-color: black;
    opacity: .3;
    margin: 10px auto 0 auto;
</style>