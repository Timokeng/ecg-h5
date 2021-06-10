<template>
  <div class="home">
    <baidu-map class="map"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
    >
      <bm-geolocation style="width:100px" @locationSuccess="show" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      zoom: 15,
      center: {
        lng: 102.71460114,
        lat: 25.0491531
      }
    }
  },
  methods: {
    show(e){
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
}


</style>
