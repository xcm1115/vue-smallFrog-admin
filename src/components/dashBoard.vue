<template>
    <el-container>
        <div class="dashBoard">
            <div class="head">
                <el-row type="flex" align="middle">
                    <el-col :span="16">
                        <div class="title">All dynamic</div>
                        <el-row type="flex" align="middle" style="margin-top: 35px;">
                            <el-col :span="8" class="name">Now Date</el-col>
                            <el-col :span="8" class="name">Status</el-col>
                            <el-col :span="8" class="name">Visits</el-col>
                        </el-row>
                        <el-row type="flex" align="middle" style="margin-top: 30px;">
                            <el-col :span="8">
                                <label class="content1">{{ gettime }} <i class="el-icon-date"></i></label>
                            </el-col>
                            <el-col :span="8">
                                <label class="content2">运行中 <i class="el-icon-loading"></i></label>
                            </el-col>
                            <el-col :span="8">
                                <label class="content3">430 <i class="el-icon-cold-drink"></i></label>
                            </el-col>
                        </el-row>
                        <div class="explanation">* The data comes from the background server.</div>
                    </el-col>
                    <el-col :span="8">
                        <img class="headImg" src="../../static/dashBoard.jpg">
                    </el-col>
                </el-row>
            </div>
            <el-card class="card">
                <!-- <ve-histogram :data="chartData" :colors="colors" width="100%"></ve-histogram> -->
                <img class="welcome" src="../../static/welcome.png">
            </el-card>
        </div>
    </el-container>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                gettime:'',//当前时间
            }
        },
        created() {
            this.currentTime();
        },
        methods: {
            getTime: function() {
                var _this = this;
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth() + 1;
                let dd = new Date().getDate();
                _this.gettime = yy + '-' + mm + '-' + dd +' ';
            },
            currentTime() {
                setInterval(this.getTime, 500)
            },
        }
    }
</script>

<style scoped>
    .dashBoard {
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .dashBoard .head {
        width: 100%;
        height: 250px;
        background-color: #f5e9eb;
        align-items: center;
    }

    .dashBoard .head .title {
        margin-top: -15px;
        margin-left: 50px;
        float: left;
        font-size: 20px;
        font-weight: bold;
        color: #f46f7b;
    }

    .dashBoard .head .name {
        color: #303133;
    }

    .dashBoard .head .content1 {
        margin-top: 20px;
        color: #ffffff;
        background-color: #9fa3e0;
        padding: 10px;
    }

    .dashBoard .head .content2 {
        margin-top: 20px;
        color: #ffffff;
        background-color: #f58c93;
        padding: 10px;
    }

    .dashBoard .head .content3 {
        margin-top: 20px;
        color: #ffffff;
        background-color: #6f8efa;
        padding: 10px;
    }

    .dashBoard .head .explanation {
        float: left;
        margin-top: 40px;
        margin-left: 50px;
        color: #C0C4CC;
    }

    .dashBoard .head .headImg {
        height: 250px;
        float: right;
    }

    .dashBoard .card {
        width: 100%;
        height: 100%;
        margin-top: 50px;
        bottom: 0;
    }

    .dashBoard .card .welcome {
        height: 350px;
    }
</style>