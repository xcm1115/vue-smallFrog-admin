<template>
    <div class="loginBody">
        <el-row>
            <el-col :span="12">
                <div class="title"><img class="head" src="../../static/logo.png"></div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                    <div class="myInput username">
                        <el-form-item prop="id">
                            <el-input class="myInput" prefix-icon="el-icon-user" v-model="ruleForm.id" placeholder="请输入手机号" clearable="true"></el-input>
                        </el-form-item>
                    </div>
                    <div class="myInput password">
                        <el-form-item prop="pass">
                            <el-input class="myInput" prefix-icon="el-icon-magic-stick" placeholder="请输入密码" v-model="ruleForm.pass" show-password></el-input>
                        </el-form-item>
                    </div>

                    <div class="login">
                        <el-form-item>
                            <el-button type="primary" circle class="logBtn" @click="submitForm('ruleForm')" icon="el-icon-s-promotion"></el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <!-- <div class="link">
                <el-link style="margin-right: 50px;" type="info" @click="toReg()">没有账号?去注册!</el-link>
                <el-link style="margin-left: 50px;" type="info" @click="toRear()">后台管理系统</el-link>
            </div> -->
            </el-col>

            <el-col :span="12" align="center">
                <img class="rightImg" src="../../static/right.png">
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            // <!--验证手机号是否合法-->
            let checkId = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(' '))
                } else if (!this.checkId(value)) {
                    callback(new Error(' '))
                } else {
                    callback()
                }
            }
            // <!--验证密码-->
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(" "))
                } else {
                    if (this.ruleForm.checkPass !== "") {
                        this.$refs.ruleForm.validateField("checkPass");
                    }
                    callback()
                }
            }

            return {
                ruleForm: {
                    pass: '',
                    id: '',
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'change'
                    }],
                    tel: [{
                        validator: checkId,
                        trigger: 'change'
                    }],
                },
            }
        },
        methods: {
            // 验证手机号
            checkId(str) {
                if (str !== '') {
                    return true;
                } else {
                    return false;
                }
            },
            // <!--提交登录-->
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        axios.post('https://www.xiaoqw.online/smallFrog-manager/server/login.php', this.ruleForm).then(response => { //用户名和密码将转为json传到后台接口              
                            let res = response.data; //用res承接返回后台的json文件(像使用数组那样)
                            if (res.status == '1') { //显示登录结果             
                                console.log('登录成功');
                                this.$notify({
                                    title: '后台管理系统',
                                    message: '您已成功登录！',
                                    type: 'success',
                                    position: 'top-left'
                                });

                                localStorage.setItem('id', this.ruleForm.id);

                                this.$router.push({
                                    path: '/'
                                });
                            } else {
                                console.log('登录失败');
                                this.$message({
                                    showClose: true,
                                    message: '登录失败！请稍后重试！',
                                    type: 'error',
                                    center: true
                                });
                            }
                        });
                    } else {
                        console.log("账号或密码错误！");
                        return false;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .loginBody {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #FFFFFF;
    }

    .rightImg {
        width: 100%;
        margin-top: 100px;
        text-align: center;
    }

    /* ------------------------------ */

    .title {
        margin-top: 10%;
        width: 100%;
        text-align: center;
    }

    .head {
        width: 350px;
    }

    .myInput input.el-input__inner {
        border-radius: 25px;
    }

    .username {
        width: 40%;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
    }

    .password {
        width: 40%;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
    }

    .login {
        margin-top: 8%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .logBtn {
        width: 50px;
        height: 50px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .link {
        margin-top: 10%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
</style>