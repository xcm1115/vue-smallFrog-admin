<template>
    <div>
        <el-card>
            <el-table 
                :height="tableHeight" 
                :data="ordersData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.User_name.toLowerCase().includes(search.toLowerCase()))" 
                highlight-current-row stripe>

                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column fixed="left" prop="ID" label="订单编号" align="center" width="150"></el-table-column>
                <el-table-column prop="Status" label="订单状态" align="center">
                    <template slot-scope="props">
                        <el-tag v-if="props.row.Status == 0" type="danger">待处理</el-tag>
                        <el-tag v-if="props.row.Status == 1" type="success">已处理</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="User_name" label="用户名" align="center" width="150"></el-table-column>
                <el-table-column prop="User_address" label="送货地址" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="User_tel" label="用户电话" align="center" width="150"></el-table-column>
                <el-table-column prop="User_CID" label="身份证号" align="center" width="200"></el-table-column>
                <el-table-column prop="Book_id" label="书籍ID" align="center" width="80"></el-table-column>
                <el-table-column prop="Book_number" label="订购数量" align="center"></el-table-column>
                <el-table-column prop="Goods_price" label="单价" align="center"></el-table-column>

                <el-table-column fixed="right" prop="Total_price" label="总价" align="center"></el-table-column>
                <el-table-column fixed="right" align="center" width="150">
                    <template slot="header">
                        <input class="search" v-model="search" size="mini" placeholder="输入用户名搜索">
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteOrder(scope.row.ID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="page" background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="ordersData.length">
            </el-pagination>
        </el-card>

        <!-- 编辑弹出框 -->
        <el-dialog title="修改订单信息" :visible.sync="editVisible" width="35%">
            <el-form label-position="left" ref="form" :model="form" label-width="80px">
                <el-form-item label="订单编号" prop="ID">
                    <el-input disabled v-model="form.ID"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" prop="Status">
                    <el-select v-model="form.Status" placeholder="请选择">
                        <el-option label="待处理" value="0"></el-option>
                        <el-option label="已处理" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="User_name">
                    <el-input disabled v-model="form.User_name"></el-input>
                </el-form-item>
                <el-form-item label="送货地址" prop="User_address">
                    <el-input type="textarea" v-model="form.User_address"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="User_ter">
                    <el-input v-model="form.User_tel" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="User_CID">
                    <el-input disabled v-model="form.User_CID" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="书籍ID" prop="Book_id">
                    <el-input v-model="form.Book_id" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="订购数量" prop="Book_number">
                    <el-input v-model.number="form.Book_number"></el-input>
                </el-form-item>
                <el-form-item label="单价" prop="Goods_price">
                    <el-input disabled v-model="form.Goods_price"></el-input>
                </el-form-item>
                <el-form-item label="总价" prop="Total_price">
                    <el-input v-model="form.Total_price" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateOrder('form')">更新</el-button>
                <el-button type="danger" @click="editVisible = false">取消</el-button>
            </div>
        </el-dialog>
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
                ordersData: [],
                editVisible: false,
                form: {},
            }
        },
        created() {
            var address = "https://www.xiaoqw.online/smallFrog-manager/server/ordersData.php";

            axios.post(address).then(res => {
                //这里是ES6的写法，get请求的地址
                this.ordersData = res.data; //获取数据
                console.log("success");
                console.log(this.ordersData);
            })
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage) //点击第几页
            },
            // 编辑操作
            handleEdit(index, row) {
                this.form = row;
                this.editVisible = true;
            },
            // 更新订单
            updateOrder(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('https://www.xiaoqw.online/smallFrog-manager/server/updateOrder.php', this.form).then(response => {                      
                            console.log('订单信息更新成功！');
                            this.$message({
                                showClose: true,
                                message: '订单信息更新成功！',
                                type: 'success',
                                center: true
                            });
                            this.reload();
                        });
                    } else {
                        console.log('error!');
                        return false;
                    }
                });
            },
            // 删除订单
            deleteOrder(ID) {
                this.$confirm('确定删除该订单？', 'Delete', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('https://www.xiaoqw.online/smallFrog-manager/server/deleteOrder.php', ID).then(response => {
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

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
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