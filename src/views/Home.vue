<template>
  <div class="home">
    <div class="func">
      <div class="pattern">
        <el-switch
          v-model="ismap"
          active-color="#12B2A8"
          inactive-color="#12B2A8"
          active-text="地图模式"
          inactive-text="列表模式"
        ></el-switch>
      </div>
      <div class="scope">
        <span>范围内客户</span>
        <el-input-number v-model="scope"></el-input-number>
        <span>KM</span>
      </div>
      <div class="type"></div>
    </div>
    <baidu-map class="baidu-map"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true">
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
      },
      ismap: true,
      scope: 5,
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

.func {
  width: 100%;
  height: 0.59rem;
  border: 1px solid black;
  margin-bottom: 0.25rem;
  font-size: 0.27rem;
  position: relative;
  
  //因为需要调element组件的尺寸，大量使用 /deep/
  .pattern {
    font-size: 0.27rem;
    height: 100%;
    display: inline-block;
    margin-right: 1rem;

    /deep/ .el-switch {
      height: 100%;
      width: auto;
      
      .el-switch__core {
        width: 1.08rem !important;
        height: 0.42rem;
        border-radius: 0.21rem;
      }

      .el-switch__core:after {
        width: 0.34rem;
        height: 0.34rem;
      }

      .el-switch__label {
        span {
          font-size: 0.27rem;
          font-weight: 600;
        }
      }

      .is-active {
        color: #12B2A8;
      }
    }

    /deep/.is-checked {
      .el-switch__core:after {
        left: 100%;
        margin-left: -(0.42rem * 17 / 20);
      }
    }
  }

  .scope {
    font-size: 0.27rem;
    height: 100%;
    display: inline-block;
    font-weight: 600;

    /deep/.el-input-number {
      width: 2.65rem;
      height: 0.54rem;
      margin: 0 0.2rem;

      .el-input-number__decrease {
        width: 0.63rem;
        height: 100%;
      }
      .el-input-number__increase {
        width: 0.63rem;
        height: 100%;
      }
      .el-input {
        height: 100%;
        font-size: 0.27rem;

        .el-input__inner {
          height: 100%;
        }
      }
    }
  }
}

.baidu-map {
  box-sizing: border-box;
  width: 100%;
  height: 11.65rem;
}
</style>
