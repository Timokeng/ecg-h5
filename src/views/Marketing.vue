<template>
  <div class="marketing">
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
      <div class="marketing">
        <div class="button" @click="openForm">填写表单</div>
      </div>
    </div>
    <div class="baidu-map-box" v-if="ismap">
      <baidu-map class="baidu-map"
        :center="center"
        :zoom="zoom"
        :dragging="false">
        <my-overlay
          v-for="(user, index) in list"
          :key="index"
          :user="user"
          @openUserBox="openUserBox"
        ></my-overlay>
      </baidu-map>
      <div class="user-info-box" v-if="showUserDetail" @click="closeUserBox">
        <div class="user-base-box" @click.stop>
          <div class="left">
            <div class="base">
              <div class="name">{{currUser.base.name}}</div>
              <div class="id">No.{{currUser.base.id}}</div>
            </div>
            <div class="detail">
              <div class="text">
                <div class="title">联系电话：</div>
                <div class="info">{{currUser.detail.pho}}</div>
              </div>
              <div class="text">
                <div class="title">身份证：</div>
                <div class="info">{{currUser.detail.idCad}}</div>
              </div>
              <div class="text">
                <div class="title">家庭住址：</div>
                <div class="info">{{currUser.detail.homeAdd}}</div>
              </div>
              <div class="text">
                <div class="title">商铺名称：</div>
                <div class="info">{{currUser.detail.store}}</div>
              </div>
              <div class="text">
                <div class="title">商铺名称</div>
                <div class="info">{{currUser.detail.store}}</div>
              </div>
              <div class="photos">
                <div class="title">与客户合影:</div>
                <div class="photo-list">
                  <div class="photo"></div>
                  <div class="photo"></div>
                  <div class="photo"></div>
                </div>
              </div>
            </div>
            <div class="label">
              <div class="title">客户标签：</div>
              <div class="label-list">
                <div class="label-box" v-for="(item, index) in currUser.label" :key="index">{{item.name}}</div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="img-data">
              <img src="../assets/五星图.png"/>
            </div>
            <div class="path-list">
              <div class="list-box" v-for="(path, index) in currUser.paths" :key="index">
                <div class="path-line">
                  <div class="icon">
                    <img src="../assets/农行-32.png"/>
                  </div>
                  <div class="date">{{path.date}}</div>
                  <div class="pos">{{path.pos}}</div>
                </div>
                <div class="dashed"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyOverlay from "@/components/MyOverlay.vue"

export default {
  created(){
    this.judgeMapFunc();
  },
  data: () => {
    return {
      mapFunc: 0,
      zoom: 18,
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
          status: "未知",
          pos: {lng: 102.71460114, lat: 25.0491531}
        },
        {
          id: 22723781994,
          name: '李四',
          status: "未知",
          pos: {lng: 102.71660214, lat: 25.0481331}
        },
        {
          id: 22723781995,
          name: '王五',
          status: "已完成",
          pos: {lng: 102.71360414, lat: 25.0501631}
        },
      ],
      showUserDetail: false,
      currUser: {
        base: {
          name: '张三',
          id: 22723781993
        },
        detail: {
          pho: 18888888888,
          idCad: 530111294381233719,
          homeAdd: '昆明市西山区西山路262号昆明市西山区西山路262号',
          store: '张三餐饮',
          images: []
        },
        label: [
          {name: '基金', status: 0},
          {name: '银利多', status: 0},
          {name: '理财', status: 0},
          {name: '贵金属', status: 0},
          {name: '大额存单', status: 0},
          {name: '乐易分', status: 0},
          {name: '信用卡', status: 0},
          {name: '掌银', status: 0},
        ],
        dataImg: {},
        paths: [
          {
            date: '2021-03-21',
            pos: '大客户圈'
          },
          {
            date: '2021-03-21',
            pos: '大客户圈'
          },
          {
            date: '2021-03-21',
            pos: '大客户圈'
          },
          {
            date: '2021-03-21',
            pos: '大客户圈'
          },
          {
            date: '2021-03-21',
            pos: '大客户圈'
          },
          {
            date: '2021-03-21',
            pos: '大客户圈'
          },
        ] 
      }
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
 
    // 关闭整个用户详细视图
    closeUserBox(){
      this.showUserDetail = false;
    },

    // 触发父组件openForm方法
    openForm(){
        this.$emit('openForm', 0)
    },

    // 打开用户详情页面
    openUserBox(){
      this.showUserDetail = true;
    },
  },
  components: {
    MyOverlay
  }
}
</script>

<style scoped lang="scss">
.marketing {
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

.baidu-map-box {
  position: relative;

  .baidu-map {
    box-sizing: border-box;
    width: 100%;
    height: 11.85rem;
    padding-right: 0.28rem;
  }

  .user-info-box {
    width: 100%;
    height: 11.85rem;
    position: absolute;
    top: 0;
    background-color: rgba($color: #fff, $alpha: 0);
    padding-top: 0.52rem;
    padding-left: 0.88rem;

    .user-base-box {
      width: 13.5rem;
      height: 10.5rem;
      display: flex;
      justify-content: space-between;

      .left {
        width: 6.2rem;
        height: 100%;
        background-color: #fff;
        padding: 0.47rem 0.52rem;
        overflow: scroll;
        border-radius: 0.1rem;
        box-shadow: 0 0 8px 2px #d1cfcf;

        .base {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba($color: #808080, $alpha: 0.5);
          color: #221714;
          font-size: 0.27rem;
          padding-bottom: 0.24rem;
          margin-bottom: 0.6rem;
        }

        .detail {
          font-size: 0.27rem;
          border-bottom: 1px solid rgba($color: #808080, $alpha: 0.5);
          padding-bottom: 0.28rem;
          margin-bottom: 0.4rem;

          .text {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            text-align: left;
            margin-bottom: 0.24rem;

            .title {
              color: rgba($color: #000000, $alpha: 0.8);
            }
            .info {
              max-width: 65%;
              color: #0D927D;
            }
          }

          .photos {
            margin-top: 0.8rem;

            .title {
              margin-bottom: 0.2rem;
              color: rgba($color: #000000, $alpha: 0.8);
            }
            
            .photo-list {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;

              .photo {
                width: 1.62rem;
                height: 1.11rem;
                margin-bottom: 0.05rem;
                background-color: #808080;
              }
            }
          }
        }

        .label {
          font-size: 0.27rem;

          .title {
            margin-bottom: 0.3rem;
            color: rgba($color: #000000, $alpha: 0.8);
          }

          .label-list {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .label-box {
              font-size: 0.2rem;
              width: 1.25rem;
              height: 0.5rem;
              border-radius: 0.25rem;
              border: 1px solid #04917D;
              margin-bottom: 0.1rem;
              margin-right: 0.04rem;
              color: #04917D;
              text-align: center;
              line-height: 0.45rem;

              &:last-child {
                margin-right: 0;
              }

              &:nth-child(2n) {
                background-color: #04917D;
                color: #fff;
              }
            }
          }
        }
      }
      .right {
        width: 6.91rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .img-data {
          width: 100%;
          height: 5.43rem;
          background-color: #fff;
          border-radius: 0.1rem;
          box-shadow: 0 0 8px 2px #d1cfcf;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            display: block;
            width: auto;
            height: 95%;
          }
        }

        .path-list {
          width: 100%;
          height: 4.54rem;
          background-color: #fff;
          border-radius: 0.1rem;
          box-shadow: 0 0 8px 2px #d1cfcf;
          font-size: 0.27rem;
          padding: 0.45rem 0.35rem;
          overflow: scroll;

          .list-box {
            .path-line {
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
              text-align: center;

              .icon {
                img {
                  width: 0.28rem;
                  height: 0.28rem;
                }
              }
              .date {
                min-width: 25%;
              }
              .pos {
                width: 35%;
              }
              .detail-form {
                color: #FF9018;
                text-decoration: underline;
              }
            }

            .dashed {
              border-left: 1px dashed #12B2A8;
              height: 0.44rem;
              margin-left: 0.13rem;
            }

            &:last-child {
              .dashed {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}


</style>
