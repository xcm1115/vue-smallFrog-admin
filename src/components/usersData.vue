<template>
    <div>
        <el-card>
            <el-table :height="tableHeight" :data="usersData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.Logname.toLowerCase().includes(search.toLowerCase()))" highlight-current-row stripe border>

                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="省份:">
                                <span>{{ props.row.Province }}</span>
                            </el-form-item>
                            <el-form-item label="受教育程度:">
                                <span>{{ props.row.Education }}</span>
                            </el-form-item>
                            <el-form-item label="爱好:">
                                <span>{{ props.row.Hobbies }}</span>
                            </el-form-item>
                            <el-form-item label="自我介绍:">
                                <span>{{ props.row.Selfintro }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column prop="ID" label="用户编号" align="center" width="100"></el-table-column>
                <el-table-column label="头像" align="center" width="80">
                    <template slot-scope="props">
                        <el-avatar :src="props.row.Avatar"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="Logname" label="用户名" align="center" width="150"></el-table-column>
                <el-table-column prop="Realname" label="真实姓名" align="center" width="150"></el-table-column>
                <el-table-column prop="Email" label="邮件地址" align="center" width="200"></el-table-column>
                <el-table-column prop="Gender" label="性别" align="center" width="80"></el-table-column>
                <el-table-column prop="Phone" label="电话号码" align="center"></el-table-column>

                <el-table-column align="center" width="150">
                    <template slot="header">
                        <input class="search" v-model="search" size="mini" placeholder="输入用户名搜索">
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteUser(scope.row.ID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="page" background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="usersData.length">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        inject: ['reload'],
        data() {
            return {
                search: '',
                currentPage: 1, //初始页
                pagesize: 10, //每页的数据
                tableHeight: window.innerHeight - 155,
                usersData: [],
            }
        },
        created() {
            var address = "https://www.xiaoqw.online/smallFrog-manager/server/usersData.php";

            axios.post(address).then(res => {
                //这里是ES6的写法，get请求的地址
                this.usersData = res.data; //获取数据
                console.log("success");
                console.log(this.usersData);
            })
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage) //点击第几页
            },
            deleteUser(ID) {
                this.$confirm('确定删除该用户？', 'Delete', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('https://www.xiaoqw.online/smallFrog-manager/server/deleteUser.php', ID).then(response => {
                        console.log('删除成功');
                        this.$message({
                            showClose: true,
                            message: '删除成功！',
                            type: 'success',
                            center: true
                        });
                        this.reload();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        /* width: 90px; */
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        text-align: center;
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .search {
        width: 120px;
        outline: 0;
        border: 0;
        text-align: center;
        color: #409EFF;
    }

    input::-webkit-input-placeholder {
        color: #409EFF;
    }

    .page {
        text-align: center;
        margin-top: 20px;
    }
</style>