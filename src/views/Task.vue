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
    <div class="baidu-map-box" v-if="ismap">
      <baidu-map class="baidu-map"
        :center="center"
        :zoom="zoom">
        <!--
        <bm-marker 
          v-for="(item, index) in list"
          :key="index"
          :position="item.pos" 
          @click="openUserBox">
        </bm-marker>
        -->
        <my-overlay
          v-for="(user, index) in list"
          :key="index"
          :user="user"
          @openUserBox="openUserBox"
        ></my-overlay>
      </baidu-map>
      <div class="user-info-box" v-if="showUserDetail" @click="closeUserBox">
        <div class="user-base-box" @click.stop>
          <div class="right">
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
          <div class="left">
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
                  <div class="detail-form" @click="openForm">点击查看</div>
                </div>
                <div class="dashed"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-detail" v-if="showForm" @click.stop>
          <div class="title">客户表单</div>
          <div class="form-onlysee"></div>
          <div class="close-button" @click="closeForm">
            <img src="../assets/E客群C-18.png"/>
          </div>
        </div>
      </div>
    </div>
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
          <div class="user" @click="openUserBox">用户画像</div>
          <div class="doform" 
            v-if="item.status == '待处理'"
            @click="toForm">填写表格
          </div>
        </div>
      </div>
      <div class="user-info-box" v-if="showUserDetail" @click="closeUserBox">
        <div class="user-base-box" @click.stop>
          <div class="right">
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
          <div class="left">
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
                  <div class="detail-form" @click="openForm">点击查看</div>
                </div>
                <div class="dashed"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-detail" v-if="showForm" @click.stop>
          <div class="title">客户表单</div>
          <div class="form-onlysee"></div>
          <div class="close-button" @click="closeForm">
            <img src="../assets/E客群C-18.png"/>
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
      type: 0,
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
          status: "待处理",
          pos: {lng: 102.71460114, lat: 25.0491531}
        },
        {
          id: 22723781994,
          name: '李四',
          status: "处理中",
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
      showForm: false,
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

    // 关闭表单
    closeForm(){
      this.showForm = false;
    },
    // 打开表单
    openForm(){
      this.showForm = true;
    },
    // 关闭整个用户详细视图
    closeUserBox(){
      this.showUserDetail = false;
    },
    // 打开用户详情页面
    openUserBox(){
      this.showUserDetail = true;
    },
    // 进去表单列表页面
    toForm(){
      this.$emit('openForm', 1)
    }
  },
  components: {
    MyOverlay
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
          
          .el-input__icon {
            line-height: 100%;
          }
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

      .right {
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
              margin-right: 0.2rem;
              border-radius: 0.25rem;
              border: 1px solid #04917D;
              margin-bottom: 0.1rem;
              color: #04917D;
              text-align: center;
              line-height: 0.45rem;

              &:nth-child(2n) {
                background-color: #04917D;
                color: #fff;
              }
            }
          }
        }
      }
      .left {
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
                width: 25%;
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

    .form-detail {
      width: 11rem;
      height: 10.5rem;
      position: absolute;
      right: 0.88rem;
      top: 0.52rem;
      border-radius: 0.1rem;
      box-shadow: 0 0 8px 2px #d1cfcf;
      background-color: #fff;
      padding: 0.47rem 0.52rem;

      .title {
        font-size: 0.27rem;
        padding-bottom: 0.24rem;
        text-align: right;
        border-bottom: 1px solid rgba($color: #808080, $alpha: 0.5);
      }

      .close-button {
        position: absolute;
        top: 1.23rem;
        left: 0;
        transform: translateX(-50%);

        img {
          width: 0.9rem;
          height: 0.9rem;
          display: block;
        }
      }
    }
  }
}

.list {
  box-sizing: border-box;
  width: 100%;
  min-height: 11.65rem;
  padding: 0.3rem 0.7rem 0 0.4rem;
  position: relative;

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

      .right {
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
            justify-content: space-between;
            flex-wrap: wrap;

            .label-box {
              font-size: 0.2rem;
              width: 1.25rem;
              height: 0.5rem;
              border-radius: 0.25rem;
              border: 1px solid #04917D;
              margin-bottom: 0.1rem;
              color: #04917D;
              text-align: center;
              line-height: 0.45rem;

              &:nth-child(2n) {
                background-color: #04917D;
                color: #fff;
              }
            }
          }
        }
      }
      .left {
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
                width: 25%;
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

    .form-detail {
      width: 11rem;
      height: 10.5rem;
      position: absolute;
      right: 0.88rem;
      top: 0.52rem;
      border-radius: 0.1rem;
      box-shadow: 0 0 8px 2px #d1cfcf;
      background-color: #fff;
      padding: 0.47rem 0.52rem;

      .title {
        font-size: 0.27rem;
        padding-bottom: 0.24rem;
        text-align: right;
        border-bottom: 1px solid rgba($color: #808080, $alpha: 0.5);
      }

      .close-button {
        position: absolute;
        top: 1.23rem;
        left: 0;
        transform: translateX(-50%);

        img {
          width: 0.9rem;
          height: 0.9rem;
          display: block;
        }
      }
    }
  }

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
