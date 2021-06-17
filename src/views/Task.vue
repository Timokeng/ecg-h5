<template>
  <div class="task">
    <div class="tabs">
      <div class="tab" 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="chooseTab(tab.id)">
        <div class="left" :class="{active: activeTab === tab.id}">
          <div class="title">{{tab.name}}</div>
          <div class="icon" :class="{active: activeTab === tab.id}"></div>
        </div>
        <div class="right">
          <div class="icon">{{tab.num}}</div>
        </div>
      </div>
    </div>
    <div class="func">
      <div class="task">
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
          <el-input-number 
            v-model="scope"
            :step="5"
            :min="5"
            :max="20"
            step-strictly
          ></el-input-number>
          <span>KM</span>
        </div>
        <div class="type">
          <el-select v-model="type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <baidu-map class="baidu-map"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      v-if="ismap">
      <bm-geolocation style="width:100px" @locationSuccess="show" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
    <div v-else class="list">
      <div class="box title">
        <div class="status">状态</div>
        <div class="name">客户姓名</div>
        <div class="id">客户ID</div>
        <div class="detail">详情</div>
      </div>
      <div class="box info" v-for="(item, index) in list" :key="index">
        <div class="status" 
          :class="{
            wait: item.status == '待处理',
            doing: item.status == '处理中',
            finish: item.status == '已完成'
          }">{{item.status}}</div>
        <div class="name">{{item.name}}</div>
        <div class="id">No.{{item.id}}</div>
        <div class="detail">
          <div class="user">用户画像</div>
          <div class="doform" v-if="item.status == '待处理'">填写表格</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.judgeMapFunc();
  },
  data: () => {
    return {
      mapFunc: 0,
      zoom: 15,
      center: {
        lng: 102.71460114,
        lat: 25.0491531
      },
      ismap: true,
      scope: 5,
      type: '',
      typeOptions: [
        {value: 0, label: '已完成任务'},
        {value: 1, label: '待处理任务'},
        {value: 2, label: '正在处理任务'},
        {value: 3, label: '全部任务'},
      ],
      tabs: [
        {id: 0, name: '活动A', num: 3},
        {id: 1, name: '活动B', num: 1},
        {id: 2, name: '活动C', num: 4},
        {id: 3, name: '活动D', num: 2},
      ],
      activeTab: 0,
      list: [
        {
          id: 22723781993,
          name: '张三',
          status: "待处理"
        },
        {
          id: 22723781994,
          name: '李四',
          status: "处理中"
        },
        {
          id: 22723781995,
          name: '王五',
          status: "已完成"
        },
      ]
    }
  },
  methods: {
    show(e){
      console.log(e);
    },

    // 活动选择
    chooseTab(id){
      this.activeTab = id;
    },

    // 通过路由信息判断func栏显示内容
    judgeMapFunc(){
        let name = this.$route.name;
        if(name === 'Task'){
            this.mapFunc = 0;
        } else if(name === 'Marketing'){
            this.mapFunc = 1;
        }
    },
  }
}
</script>

<style scoped lang="scss">
.task {
  width: 100%;
  height: 100%;
  position: relative;
}

.tabs{
  height: auto;
  width: 100%;
  border-bottom: 2px solid rgba(51, 51, 51, 0.6);
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.3rem;
  overflow: scroll;

  .tab{
    display: flex;
    flex: 1 0 auto;

    .left {
      font-size: 0.3rem;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;

      .title{
        width: 100%;
        text-align: center;
        margin-bottom: 0.13rem;
        height: 0.35rem;
      }

      .icon{
        width: 80%;
        height: 0.11rem;
        background-color: #fff;
        border-radius: 0.05rem;
      }
      .active {
        background-color: #12B2A8;
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
        background-image: url('../assets/E客群C-13.png');
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

.func {
  width: 100%;
  height: 0.59rem;
  margin-bottom: 0.25rem;
  font-size: 0.27rem;
  
  .marketing {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 0.28rem;

    .button {
      width: 3.61rem;
      height: 0.54rem;
      background-color: #12B2A8;
      line-height: 0.54rem;
      text-align: center;
      color: #fff;
      font-size: 0.27rem;
      border-radius: 0.06rem;
    }
  }

  .task {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding-right: 0.28rem;
    
    //因为需要调element组件的尺寸，大量使用 /deep/
    .pattern {
      font-size: 0.27rem;
      height: 100%;

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


      /deep/.el-input-number {
        width: 2.65rem;
        height: 0.54rem;
        margin: 0 0.2rem;

        .el-input-number__decrease {
          width: 0.63rem;
          height: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .el-input-number__increase {
          width: 0.63rem;
          height: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .el-input {
          height: 100%;
          font-size: 0.27rem;

          .el-input__inner {
            height: 100%;
            line-height: 100%;
            display: block;

            &:focus {
              border-color: #C0C4CC;
            }
          }
        }
      }
    }

    .type {
      font-size: 0.27rem;
      height: 100%;
      align-self: flex-end;

      /deep/.el-select {
        height: 100%;
        width: 3.55rem;

        .el-input {
          height: 100%;

          .el-input__inner {
            height: 100%;
            line-height: 100%;

            &:focus {
              border-color: #C0C4CC;
            }
          }
        }
      }
    }
  }
}

.baidu-map {
  box-sizing: border-box;
  width: 100%;
  height: 11.65rem;
  padding-right: 0.28rem;
}

.list {
  box-sizing: border-box;
  width: 100%;
  min-height: 11.65rem;
  padding: 0.3rem 0.7rem 0 0.4rem;

  .box {
    width: 16rem;
    height: 1.07rem;
    border-radius: 0.1rem;
    box-shadow: 0 0 10px 5px #DEDEDE;
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    text-align: center;
    margin-bottom: 0.36rem;

    &:last-child {
      margin-bottom: 0;
    }

    .status {
      width: 15%;
    }
    .name {
      width: 15%;
    }
    .id {
      width: 20%;
    }
    .detail {
      width: 50%;
    }
  }

  .title {
    color: #808080;
    box-shadow: none;
    height: auto;
  }

  .info {
    .wait {
      color: #F85D28;
    }
    .doing {
      color: #FAA21E;
    }
    .finish {
      color: #04917D;
    }
    .detail {
      display: flex;
      justify-content: space-between;
      color: #fff;
      padding: 0 0.59rem;

      div {
        width: 3.07rem;
        height: 0.53rem;
        line-height: 0.53rem;
        border-radius: 0.06rem;
        flex: auto;
      }
      .user {
        background-color: #12B2A8;
      }
      .doform {
        background-color: #FAA21E;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
