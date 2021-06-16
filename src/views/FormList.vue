<template>
    <div class="formlist">
        <div class="box">
            <div class="line title">
                <div class="left">表单名称</div>
                <div class="right">操作</div>
            </div>
            <div class="line" v-for="(form, index) in formList" :key="index">
                <div class="left">{{form.name}}</div>
                <div class="right">
                    <div class="example" @click="go(0)">填表示例</div>
                    <div class="doform" @click="go(1)">填写表单</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data: ()=>{
        return {
            formList: [
                {id:1, name: '表格名称表格名称表格名称表格名称'},
                {id:2, name: '表格名称表格名称表格名称表格名称'},
                {id:3, name: '表格名称表格名称表格名称表格名称'},
                {id:4, name: '表格名称表格名称表格名称表格名称'},
                {id:5, name: '表格名称表格名称表格名称表格名称'},
                {id:6, name: '表格名称表格名称表格名称表格名称'},
            ]
        }
    },
    methods: {
        go(num){
            this.$router.push({
                path: '/form',
                query: { formType: num}
            })
        }
    }
}
</script>

<style scoped lang="scss">
.formlist {
    width: 100%;
    height: 100%;
    padding: 0.68rem 0.88rem;
    background-image: linear-gradient(to right, #47C0B2, #fff, #fff);

    .box {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 0.2rem;
        box-shadow: 0 0 8px 2px rgb(201, 200, 200);
        overflow: scroll;
        padding-top: 0.57rem;

        .line {
            width: 18rem;
            height: 1.08rem;
            box-shadow: 0 0 8px 2px rgb(201, 200, 200);
            border-radius: 0.1rem;
            margin: auto;
            top: 0;
            left: 0;
            margin-bottom: 0.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;

            .left {
                width: 35%;
                font-size: 0.32rem;
                color: #04917D;
            }
            .right {
                font-size: 0.28rem;
                color: #fff;
                width: 45%;
                display: flex;
                justify-content: space-around;
                padding: 0 0.5rem;

                div {
                    flex: none;
                    width: 3.07rem;
                    height: 0.52rem;
                    border-radius: 0.05rem;
                    line-height: 0.52rem;
                }
                .example {
                    background-color: #12B2A8;
                }
                .doform {
                    background-color: #FAA21E;
                }
            }
        }

        .title {
            font-size: 0.28rem;
            color: #808080;
            box-shadow: none;
            height: auto;
            margin-bottom: 0.37rem;

            .left {
                font-size: 0.28rem;
                color: #808080;
            }
            .right {
                font-size: 0.28rem;
                color: #808080;
            }
        }
    }
}
</style>