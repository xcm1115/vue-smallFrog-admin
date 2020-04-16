<template>
    <div>
        <el-container>
            <el-aside width="250px">
                <el-menu class="aside" 
                    :default-active="$route.path" 
                    router="true" 
                    @open="handleOpen" 
                    @close="handleClose" 
                    background-color="#545c64" 
                    text-color="#FFFFFF" 
                    active-text-color="#ffd04b"
                >
                    <div class="logo"><img class="gif" src="../../static/title.gif"></div>

                    <el-menu-item index="/dashBoard">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>首页</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/usersData">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>用户管理</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-management"></i>
                            <span>书籍管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/booksData/allBooks"><i class="el-icon-caret-right"></i>全部书籍</el-menu-item>
                            <el-menu-item index="/booksData/pcBooks"><i class="el-icon-caret-right"></i>计算机类</el-menu-item>
                            <el-menu-item index="/booksData/enBooks"><i class="el-icon-caret-right"></i>英语类</el-menu-item>
                            <el-menu-item index="/booksData/otherBooks"><i class="el-icon-caret-right"></i>其他类</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/ordersData">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>订单管理</span>
                        </template>
                    </el-menu-item>
                    
                    <label @click="handleCommand('loginout')">
                        <el-menu-item class="exit">
                        <template slot="title">
                            <i class="el-icon-error"></i>
                            <span>退出登录</span>
                        </template>
                    </el-menu-item>
                    </label>
                    
                </el-menu>
            </el-aside>

            <el-main>
                <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('id');
                this.$router.push('/login');
            }
        },
        }
    }
</script>

<style>
    .aside {
        position: fixed;
        width: 250px;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
    }

    .logo {
        height: 100px;
        text-align: center;
        cursor: pointer;
    }

    .logo .gif {
        width: 180px;
        margin-top: 10px;
    }

    .exit {
        position: absolute;
        width: 100%;
        bottom: 20px;
    }

    body {
        background-color: #F2F1F6;
    }
</style>