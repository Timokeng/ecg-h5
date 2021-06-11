<template>
  <div id="app">
    <div id="head">
      <div class="center">
        <div class="logo">
          <div class="img">
            <img src="@/assets/nh-logo.png"/>
          </div>
          <div class="img-bottom">
            <img src="@/assets/nh-logo-bottom.png"/>
          </div>
        </div>
        <div class="text">彩云·e客群</div>
      </div>
    </div>
    <div id="main">
      <div id="nav">
        <div class="nav-option" @click="chooseNav(0)">
          <div class="box">
            <div class="img">
              <img src="@/assets/E客群C-12.png"/>
            </div>
            <div class="text">任务受理</div>
          </div>
        </div>
        <div class="nav-option" @click="chooseNav(2)">
          <div class="box">
            <div class="img">
              <img src="@/assets/E客群C-11.png"/>
            </div>
            <div class="text">主动营销</div>
          </div>
        </div>
      </div>
      <div id="article">
        <div id="tabs">
          <div id="tab">
            <div class="left" :class="{active: activeTab === 0}">
              <div class="title">活动A</div>
              <div class="icon">
                <img src="@/assets/农行-30.png" v-if="activeTab === 0"/>
              </div>
            </div>
            <div class="right">
              <div class="icon">1</div>
            </div>
          </div>
          <div id="tab">
            <div class="left" :class="{active: activeTab === 1}">
              <div class="title">活动B</div>
              <div class="icon">
                <img src="@/assets/农行-30.png" v-if="activeTab === 1"/>
              </div>
            </div>
            <div class="right">
              <div class="icon">1</div>
            </div>
          </div>
          <div id="tab">
            <div class="left" :class="{active: activeTab === 2}">
              <div class="title">活动C</div>
              <div class="icon">
                <img src="@/assets/农行-30.png" v-if="activeTab === 2"/>
              </div>
            </div>
            <div class="right">
              <div class="icon">1</div>
            </div>
          </div>
          <div id="tab">
            <div class="left" :class="{active: activeTab === 3}">
              <div class="title">活动D</div>
              <div class="icon">
                <img src="@/assets/农行-30.png" v-if="activeTab === 3"/>
              </div>
            </div>
            <div class="right">
              <div class="icon">1</div>
            </div>
          </div>
        </div>
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
      tid: 0,
      activeTab: 0
    }
  },
  created(){
    this.pageAdaptor();
  },
  mounted(){
    // 添加页面变化监听器，刷新适配
    window.addEventListener("resize", ()=>{
      clearTimeout(this.tid);
      this.tid = setTimeout(this.setBaseFontSize, 300);
    })
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
        console.log(this.pageAdaptDate.fontSizeRadio);
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
    
      // 根据状态做横屏状态做适应(本项目默认横版开发，不需要做该适应，实际版本记得改过来)
      /*
      if(this.pageAdaptDate.isLandscape){
        deviceWidth = deviceHeight;
      }
      */
      // 结合所有数据做设置font-size
      let widthRadio = Math.floor(deviceWidth / this.pageAdaptDate.designWidth * 100);
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
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#head{
  min-height: 1rem;
  width: 100%;
  background-color: RGBA(18, 169, 157, 1);
  position: relative;

  .center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;

    .logo{
      .img{
        width: 2.14rem;
        height: 0.43rem;
        margin-bottom: 0.05rem;

        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .img-bottom {
        width: 0.8rem;
        height: 0.2rem;
        margin-left: 0.53rem;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }

    .text {
      font-family: MicrosoftYaHeiUI;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.32rem;
      height: 0.49rem;
      line-height: 0.49rem;
      border-left: 2px solid rgba(255, 255, 255, 1);
      margin-left: 0.25rem;
      padding-left: 0.25rem;
      transform: translateY(0.1rem);
    }
  }
}


#tabs{
  height: auto;
  width: 100%;
  border-bottom: 2px solid rgba(51, 51, 51, 0.6);
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.28rem;
  margin-top: 0.33rem;

  #tab{
    display: flex;
    flex: auto;

    .left {
      font-size: 0.3rem;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: flex-end;

      .title{
        width: 100%;
        text-align: center;
        margin-bottom: 0.13rem;
        height: 0.35rem;
      }

      .icon{
        width: 100%;
        height: 0.11rem;
        padding: 0 0.15rem;

        img{
          display: block;
          margin: auto;
          width: 100%;
          height: 100%;
        }
      }
    }
    .active {
      color: rgba(18, 178, 168, 1);
    }

    .right{
      width: 0.63rem;
      height: 0.91rem;

      .icon {
        width: 0.45rem;
        height: 0.3rem;
        background-image: url('./assets/E客群C-13.png');
        background-repeat: no-repeat;
        background-size: contain;
        text-align: center;
        color: #fff;
        font-size: 0.17rem;
        line-height: 0.3rem;
      }
    }
  }
}


#main{
  width: 100%;
  display: flex;

  #nav{
    width: 2.83rem;
    overflow: hidden;

    .nav-option{
      font-size: 0.27rem;
      color: rgba(18, 178, 168, 1);
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 1.19rem;
      &:first-child{
        margin-top: 0.62rem;
      }
      &:last-child {
        margin-bottom: 0;
      }

      .box {
        .img {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 0.05rem;

          img {
            display: block;
            width: 0.6rem;
            height: 0.6rem;
          }
        }
      }
    }
  }

  #article{
    width: 17.6rem;
    height: 14.3rem;
    padding-left: 0.49rem;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
