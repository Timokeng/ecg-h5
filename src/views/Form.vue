<template>
    <div class="form">
        <div class="box">
            <el-row>
                <div class="label">客户标签:</div>
                <el-input></el-input>
            </el-row>
            <el-row>
                <div class="label">客户标签:</div>
                <el-input></el-input>
            </el-row>
            <el-row>
                <div class="label">客户标签:</div>
                <el-input></el-input>
            </el-row>
            <el-row>
                <div class="label">客户标签:</div>
                <el-input></el-input>
            </el-row>
            <div class="button">提交</div>
        </div>
    </div>
</template>

<script>
export default{

}
</script>

<style scoped lang="scss">
.form {
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
        padding: 0.57rem 0.8rem;
        position: relative;

        /deep/ .el-row {
            margin-bottom: 0.64rem;

            .label {
                font-size: 0.26rem;
                margin-bottom: 0.17rem;
            }

            .el-input {
                display: block;
                font-size: 0.26rem;

                .el-input__inner {
                    height: 0.68rem;
                    line-height: 0.68rem;
                }
            }
        }

        .button {
            width: 91%;
            height: 0.75rem;
            line-height: 0.75rem;
            color: #fff;
            font-size: 0.26rem;
            text-align: center;
            background-color: #12B2A8;
            border-radius: 0.05rem;
            bottom: 0.8rem;
            position: absolute;
            box-sizing: content-box;
        }
    }
}
</style>