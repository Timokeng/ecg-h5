<template>
  <div id="app">
    <div id="head">
      <div id="logo">
        <div id="img">
          <img src="@/assets/农行-21.png"/>
        </div>
      </div>
      <div id="tabs">
        <div id="tab">
          <div class="left">
            <div class="title">活动1</div>
            <div class="icon">
              <img src="@/assets/农行-30.png"/>
            </div>
          </div>
          <div class="right"></div>
        </div>
        <div id="tab">
          <div class="left">
            <div class="title">活动1</div>
            <div class="icon"></div>
          </div>
          <div class="right"></div>
        </div>
        <div id="tab">
          <div class="left">
            <div class="title">活动1</div>
            <div class="icon"></div>
          </div>
          <div class="right"></div>
        </div>
        <div id="tab">
          <div class="left">
            <div class="title">活动1</div>
            <div class="icon"></div>
          </div>
          <div class="right"></div>
        </div>
      </div>
    </div>
    <div id="main">
      <div id="nav">
        <div class="nav-option" :class="{active: navActive==0}" @click="chooseNav(0)">任务受理</div>
        <div class="nav-option" :class="{active: navActive==1}" @click="chooseNav(1)">客户分布</div>
        <div class="nav-option" :class="{active: navActive==2}" @click="chooseNav(2)">主动营销</div>
      </div>
      <div id="article">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: ()=>{
    return {
      navActive: 0,
    }
  },
  methods:{
    chooseNav(num){
      this.navActive = num;
      let path;
      if(num === 0){
        path = '/task'
      } else if(num === 1){
        path= '/division'
      } else{
        path = '/marketing'
      }
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss">
#head{
  height: 1.67rem;
  width: 100%;
  border-bottom: 1px rgba($color: #000000, $alpha: 0.5) solid;
  display: flex;
  margin-bottom: 0.37rem;

  #logo{
    height: 100%;

    #img{
      width: 3.44rem;
      height: 1.09rem;
      margin: 0.34rem 0 0.24rem 0.57rem;

      img{
        max-width: 100%;
        height: auto;
      }
    }
  }

  #tabs{
    height: 100%;
    width: 100%;
    margin: 0 1rem;
    border-left: 1px solid black;
    display: flex;
    justify-content: space-around;

    #tab{
      display: flex;

      .left{
        min-width: 1rem;
        font-size: 0.36rem;
        font-family: Microsoft YaHei UI;
        font-weight: 400;
        color: #333333;
        background-color: greenyellow;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: flex-end;

        .title{
          width: 100%;
          text-align: center;
          margin-bottom: 0.3rem;
          height: 0.35rem;
          opacity: 0.6;
        }

        .icon{
          width: 100%;
          height: 0.11rem;

          img{
            display: block;
            margin: auto;
          }
        }
      }

      .right{
        width: 0.63rem;
        background-color: indigo;
      }
    }
  }
}

#main{
  width: 100%;
  min-width: 1.294rem;
  display: flex;

  #nav{
    width: 4rem;
    overflow: hidden;
    padding-top: 0.06rem;

    .nav-option{
      width: 2.95rem;
      height: 1.03rem;
      margin: 0 0.57rem 0.48rem 0.48rem;
      border-radius: 0.1rem;
      box-shadow: 0 0 0.04rem 0.04rem rgba($color: rgb(204, 199, 199), $alpha: 0.5);
      text-align: center;
      line-height: 1.03rem;
      font-size: 0.32rem;
      font-weight: 400;
      color: #221714;
      font-family: Microsoft YaHei UI;
    }

    .active{
      background-image: url(./assets/农行-24.png);
      background-clip: border-box;
      color: #fff;
    }
  }

  #article{
    width: 16.16rem;
    height: 12.94rem;
    padding-top: 0.06rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.06rem 0.06rem rgba($color: rgb(204, 199, 199), $alpha: 0.5);
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
