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
      pageAdaptDate:{
        designWidth: 2048,
        dpr: 1,
        scale: 1,
        fontSizeRadio: 1,//手机字体比例
        isLandscape: false//是否横屏
      },
    }
  },
  created(){
    this.pageAdaptor();
  },
  methods:{
    // 移动端页面适配
    pageAdaptor(){
      this.pageAdaptDate.dpr = window.devicePixelRatio || 1,
      this.pageAdaptDate.scale = 1 / this.pageAdaptDate.dpr;
    
      /* 该方法可以特为追求极致显示效果，需要和UI配合
         主要是图片部分，为实现预期效果需要图片尺寸天生偏大，才能实现预期显示
         本身该方法会减少每个像素点上的物理像素点，实际显示效果未必更好
      this.setViewPort(); 
      */
      this.systemFontSizeCheck();
      this.setBaseFontSize(); 
    },
    // 设置viewport
    setViewPort(){
      document.getElementsByName('viewport')[0].setAttribute('content',
        `width=device-width,
        initial-scale=${this.pageAdaptDate.scale},
        maximum-scale=${this.pageAdaptDate.scale},
        minimum-scale=${this.pageAdaptDate.scale},
        user-scalable=no`
      );
    },
    // 检查手机系统字体大小和浏览器差距
    systemFontSizeCheck(){
      // 设置初始字体，检测系统字体是否正常
      let setFz = '100px';

      // 设置一个隐藏的元素赖防止font-size设置时页面的晃动
      let headEle = document.getElementsByTagName('head')[0],
          spanEle = document.createElement('span');
      
      spanEle.style.fontSize = setFz;
      spanEle.style.display = 'none';
      headEle.appendChild(spanEle);

      // 比较初始字体和系统字体
      // 若存在差距则计算换算比例
      let realFz = getComputedStyle(spanEle).getPropertyValue('font-size');

      if(setFz !== realFz){
        setFz = parseFloat(setFz);
        realFz = parseFloat(realFz);

        // 将字体的比例存入数据
        this.pageAdaptDate.fontSizeRadio = setFz / realFz;
      }
    },
    // 设置html上的font-size
    setBaseFontSize(){
      // 横屏状态检测
      if(window.orientation === 90 || window.orientation === -90){
        this.pageAdaptDate.isLandscape = true;
      } else{
        this.pageAdaptDate.isLandscape = false;
      }
      // 获取设备宽度、高度
      let deviceWidth = document.documentElement.clientWidth;
      // let deviceHeight = document.documentElement.clientHeight;
    
      // 根据状态做横屏状态做适应(本项目默认横版开发，不需要做该适应)
      /*
      if(this.pageAdaptDate.isLandscape){
        deviceWidth = deviceHeight;
      }
      */
      // 结合所有数据做设置font-size
      let widthRadio = Math.round(deviceWidth / this.pageAdaptDate.designWidth * 100);
      document.documentElement.style.fontSize = widthRadio * this.pageAdaptDate.fontSizeRadio + 'px';
    },

    // 导航栏目选择
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
            width: 0.61rem;
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
      background-repeat: no-repeat;
      background-size: cover;
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
