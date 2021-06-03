<template>
  <div id="app">
    <div id="head">
      <div id="logo">
        <div id="img">
          <img src="@/assets/农行-21.png"/>
        </div>
      </div>
      <div id="tabs"></div>
    </div>
    <div id="main">
      <div id="nav">
        <div class="nav-option"></div>
        <div class="nav-option"></div>
        <div class="nav-option"></div>
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
    border-left: 1px solid black;
  }
}

#main{
  width: 100%;
  height: 85%;
  display: flex;

  #nav{
    width: 3.79rem;
    overflow: hidden;
    padding-top: 0.06rem;

    .nav-option{
      width: 2.95rem;
      height: 1.03rem;
      margin: 0 0.36rem 0.48rem 0.48rem;
      
      border-radius: 10px;
      box-shadow: 0 0 0.06rem 0.06rem rgba($color: rgb(204, 199, 199), $alpha: 0.5);
    }
  }

  #article{
    padding-top: 0.06rem;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
