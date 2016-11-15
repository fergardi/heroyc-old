<template lang="pug">
  #World
    .map-container
      #map
</template>

<script>
  import api from '../services/api.js'
  export default {
    name: 'World',
    data () {
      return {
        locations: [],
        map: null,
        current: {},
        options: {
          zoom: 9,
          center: [-5.5, 42.5],
          pitch: 0,
          token: 'pk.eyJ1IjoiZmVyZ2FyZGkiLCJhIjoiY2lxdWl1enJiMDAzaWh4bTNwY3F6MnNwdiJ9.fPkJoOfrARPtZWCj1ehyCQ',
          //style: 'mapbox://styles/fergardi/civamajjq003t2imgv46s299o',
          style: 'mapbox://styles/fergardi/cirymo82r004jgym6lh1lkgo5',
          position: 'bottom-left',
          range: 500,
        },
        avatar: null
      }
    },
    mounted () {
      api.getLocations((data) => {
        this.locations = data;
        this.createMap();
        this.drawLocations();
        this.geoLocate();
      });
    },
    methods: {
      createMap () {
        mapboxgl.accessToken = this.options.token;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.options.style,
          pitch: this.options.pitch,
          zoom: this.options.zoom,
          center: this.options.center,
          attributionControl: { position: this.position }
        });
        /*
        this.map.on('click', function(e){
          console.log(e.lngLat);
        });
        */
      },
      drawLocations () {
        for (var i = 0; i < this.locations.length; i++) {
          this.addLocation(this.locations[i]);
        }
      },
      geoLocate () {
        navigator.geolocation.getCurrentPosition((position) => {
            if (this.avatar === null) this.move(position.coords.longitude, position.coords.latitude);
            this.current = position;
            this.updatePosition(new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude));
          }
        );
      },
      move (lat, lng) {
        this.map.flyTo({
          center: [lat, lng],
          speed: 1,
          curve: 1,
          zoom: this.options.zoom
        });
      },
      updatePosition (location) {
        if (this.avatar === null) {
          var marker = document.createElement('div');
          marker.style.zIndex = 10;
          // add an icon
          var icon = document.createElement('img');
          icon.src = 'dist/img/player/avatar.png';
          icon.className = 'map-avatar animated infinite bounce';
          marker.appendChild(icon);
          // add a shadow
          var shadow = document.createElement('div');
          shadow.className = 'map-avatar-shadow';
          marker.appendChild(shadow);
          marker.addEventListener('click', (event) => {
            this.$router.push({ name: 'player' });
          });
          // add marker to map
          this.avatar = new mapboxgl.Marker(marker, { offset: [-30, -77] }).setLngLat(location).addTo(this.map);
        } else {
          // move marker in map
          this.avatar.setLngLat(location);
        }
      },
      addLocation (location) {
        var icon = document.createElement('img');
        icon.src = 'dist/img/locations/' + location.image + '.png';
        icon.className = 'map-location animated zoomIn';
        var marker = document.createElement('div');
        marker.appendChild(icon);
        marker.id = location.id;
        marker.style.zIndex = 5;
        marker.addEventListener('click', (e) => {
          if (this.near(location) < this.options.range) {
            switch(location.image){
              case 'city':
                this.$router.push({ name: 'city' });
                break;
              case 'forge':
                this.$router.push({ name: 'forge' });
                break;
              case 'inn':
                this.$router.push({ name: 'inn' });
                break;
              case 'market':
                this.$router.push({ name: 'market' });
                break;
              case 'dungeon':
              case 'tower':
              case 'mine':
              case 'ruins':
              case 'castle':
                this.$router.push({ name: 'location', params: { locationId: location.id }});
                break;
            }  
          }
        });
        new mapboxgl.Marker(marker, { offset: [-icon.naturalWidth/2, -icon.naturalHeight] }).setLngLat([location.lng, location.lat]).addTo(this.map);
      },
      near (point) {
        return this.distance(this.avatar.getLngLat(), point);
      },
      distance (point1, point2) {
        var lat1 = point1.lat;
        var lng1 = point1.lng;
        var lat2 = point2.lat;
        var lng2 = point2.lng;
        var R = 6371000;
        var x1 = lat2 - lat1;
        var dLat = this.toRad(x1);
        var x2 = lng2 - lng1;
        var dLon = this.toRad(x2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var dist = R * c;
        return dist;
      },
      toRad (deg) {
        return deg * Math.PI / 180;
      },    
      toDeg (rad) {
        return rad * 180 / Math.PI;
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