<template>
    <div>
        <el-card>
            <el-table :height="tableHeight" :data="allBooks.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))" highlight-current-row stripe>

                <el-table-column type="expand">
                    <div slot-scope="props" style="text-align: center">
                        <div class="bookContent">
                            <p style="text-align: center;">内容简介</p>
                            {{ props.row.Content }}
                        </div>
                        <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                            <el-form-item label="所属分类:">
                                <span v-if="props.row.Category == 1">计算机类</span>
                                <span v-if="props.row.Category == 2">英语类</span>
                                <span v-if="props.row.Category == 3">其他类</span>
                            </el-form-item>
                            <el-form-item label="语言:">
                                <span v-if="props.row.Language == 1">中文</span>
                                <span v-if="props.row.Language == 2">英文</span>
                            </el-form-item>
                            <el-form-item label="是否含盘:">
                                <span v-if="props.row.Cdrom == 1">含</span>
                                <span v-if="props.row.Cdrom == 2">不含</span>
                            </el-form-item>
                            <el-form-item label="上架时间:">
                                <span>{{ props.row.On_Sale_Time }}</span>
                            </el-form-item>
                            <el-form-item label="是否打折:">
                                <span v-if="props.row.Good_Price == 1">打折</span>
                                <span v-if="props.row.Good_Price == 2">不打折</span>
                            </el-form-item>
                            <el-form-item label="出版社地址:">
                                <span>{{ props.row.Publish_address }}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-table-column>

                <el-table-column prop="ID" label="书籍编号" align="center" width="80"></el-table-column>
                <el-table-column label="书籍封面" align="center" width="100">
                    <template slot-scope="props">
                        <img class="bookImg" :src="'https://www.xiaoqw.online/smallFrog-bookstore/img/'+props.row.img" :preview-src-list="['https://www.xiaoqw.online/smallFrog-bookstore/img/'+props.row.img]">
                    </template>
                </el-table-column>
                <el-table-column prop="Name" align="center" label="书名" width="150"></el-table-column>
                <el-table-column prop="Author" label="作者" align="center"></el-table-column>
                <el-table-column prop="Price" label="价格" align="center" width="100"></el-table-column>
                <el-table-column prop="Publish_name" label="出版社名称" align="center" width="150"></el-table-column>
                <el-table-column prop="Commend" label="推荐程度" align="center" width="80"></el-table-column>
                <el-table-column prop="Book_Num" label="库存量" align="center" width="80"></el-table-column>

                <el-table-column align="center" width="150">
                    <template slot="header">
                        <input class="search" v-model="search" size="mini" placeholder="输入书名搜索">
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteBook(scope.row.ID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row style="margin-top: 20px;">
                <el-col :span="8">
                    <el-button type="primary" size="medium" @click="openAddBook()" icon="el-icon-circle-plus-outline" plain>添加书籍</el-button>
                </el-col>
                <el-col :span="16">
                    <el-pagination class="page" background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="allBooks.length">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-card>

        <!-- 书籍信息编辑弹出框 -->
        <el-dialog title="编辑书籍信息" :visible.sync="editVisible1" width="35%">
            <el-form label-position="left" :rules="rules" ref="form" :model="form" label-width="100px">
                <el-form-item label="书籍编号" prop="ID">
                    <el-input disabled v-model.number="form.ID"></el-input>
                </el-form-item>
                <el-form-item label="封面图片" prop="img">
                    <el-input v-model="form.img"></el-input>
                </el-form-item>
                <el-form-item label="书名" prop="Name">
                    <el-input v-model="form.Name"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="Author">
                    <el-input v-model="form.Author"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="Price">
                    <el-input v-model="form.Price" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="出版社名称" prop="Publish_name">
                    <el-input v-model="form.Publish_name"></el-input>
                </el-form-item>
                <el-form-item label="出版社地址" prop="Publish_address">
                    <el-input v-model="form.Publish_address"></el-input>
                </el-form-item>
                <el-form-item label="内容简介" prop="Content">
                    <el-input type="textarea" v-model="form.Content"></el-input>
                </el-form-item>
                <el-form-item label="上架时间" prop="On_Sale_Time">
                    <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.On_Sale_Time"></el-date-picker>
                </el-form-item>
                <el-form-item label="库存量" prop="Book_Num">
                    <el-input v-model.number="form.Book_Num" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="Category">
                    <el-select v-model="form.Category" placeholder="请选择">
                        <el-option label="计算机类" value="1"></el-option>
                        <el-option label="英语类" value="2"></el-option>
                        <el-option label="其他类" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="推荐程度" prop="Commend">
                    <el-input v-model="form.Commend" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="是否含盘" prop="Cdrom">
                    <el-select v-model="form.Cdrom" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否打折" prop="Good_Price">
                    <el-select v-model="form.Good_Price" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语言" prop="Language">
                    <el-select v-model="form.Language" placeholder="请选择">
                        <el-option label="中文" value="1"></el-option>
                        <el-option label="英文" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateBook('form')">修改</el-button>
                <el-button type="info" @click="resetForm('form')">重置</el-button>
                <el-button type="danger" @click="editVisible1 = false">取消</el-button>
            </div>
        </el-dialog>


        <!-- 添加书籍弹出框 -->
        <el-dialog title="添加书籍" :visible.sync="editVisible2" width="35%">
            <el-form label-position="left" :rules="rules" ref="bookAddForm" :model="bookAddForm" label-width="100px">
                <el-form-item label="书籍编号" prop="ID">
                    <el-input v-model.number="bookAddForm.ID" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="封面图片" prop="img">
                    <el-input v-model="bookAddForm.img"></el-input>
                </el-form-item>
                <el-form-item label="书名" prop="Name">
                    <el-input v-model="bookAddForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="Author">
                    <el-input v-model="bookAddForm.Author"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="Price">
                    <el-input v-model="bookAddForm.Price" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="出版社名称" prop="Publish_name">
                    <el-input v-model="bookAddForm.Publish_name"></el-input>
                </el-form-item>
                <el-form-item label="出版社地址" prop="Publish_address">
                    <el-input v-model="bookAddForm.Publish_address"></el-input>
                </el-form-item>
                <el-form-item label="内容简介" prop="Content">
                    <el-input type="textarea" v-model="bookAddForm.Content"></el-input>
                </el-form-item>
                <el-form-item label="上架时间" prop="On_Sale_Time">
                    <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="bookAddForm.On_Sale_Time"></el-date-picker>
                </el-form-item>
                <el-form-item label="库存量" prop="Book_Num">
                    <el-input v-model.number="bookAddForm.Book_Num" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="Category">
                    <el-select v-model="bookAddForm.Category" placeholder="请选择">
                        <el-option label="计算机类" value="1"></el-option>
                        <el-option label="英语类" value="2"></el-option>
                        <el-option label="其他类" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="推荐程度" prop="Commend">
                    <el-input v-model="bookAddForm.Commend" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="是否含盘" prop="Cdrom">
                    <el-select v-model="bookAddForm.Cdrom" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否打折" prop="Good_Price">
                    <el-select v-model="bookAddForm.Good_Price" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语言" prop="Language">
                    <el-select v-model="bookAddForm.Language" placeholder="请选择">
                        <el-option label="中文" value="1"></el-option>
                        <el-option label="英文" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addBook('bookAddForm')" plain>添加</el-button>
                <el-button type="danger" @click="editVisible2 = false" plain>取消</el-button>
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
                tableHeight: window.innerHeight - 160,
                allBooks: [],
                editVisible1: false,
                editVisible2: false,
                form: {},
                bookAddForm: {
                    ID: '',
                    Name: '',
                    Author: '',
                    Language: '',
                    Category: '',
                    Cdrom: '',
                    Commend: '',
                    Content: '',
                    Price: '',
                    On_Sale_Time: '',
                    Good_Price: '',
                    Publish_name: '',
                    Publish_address: '',
                    Book_Num: '',
                    img: '',
                },
                rules: {
                    ID: [{
                        required: true,
                        message: '请输入书籍编号',
                        trigger: 'blur'
                    }],
                    Name: [{
                        required: true,
                        message: '请输入书名',
                        trigger: 'blur'
                    }],
                    Author: [{
                        required: true,
                        message: '请输入作者',
                        trigger: 'blur'
                    }],
                    Price: [{
                        required: true,
                        message: '请输入价格',
                        trigger: 'blur'
                    }],
                    Book_Num: [{
                        required: true,
                        message: '请输入库存量',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            var address = "https://www.xiaoqw.online/smallFrog-manager/server/allBooks.php";

            axios.post(address).then(res => {
                //这里是ES6的写法，get请求的地址
                this.allBooks = res.data; //获取数据
                console.log("success");
                console.log(this.allBooks);
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
                this.editVisible1 = true;
            },
            // 更新书籍
            updateBook(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('https://www.xiaoqw.online/smallFrog-manager/server/updateBook.php', this.form).then(response => {                      
                            console.log('书籍信息更新成功！');
                            this.$message({
                                showClose: true,
                                message: '书籍信息更新成功！',
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
            // 添加书籍
            addBook(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('https://www.xiaoqw.online/smallFrog-manager/server/addBook.php', this.bookAddForm).then(response => {            
                            let res = response.data; //用res承接返回后台的json文件(像使用数组那样)
                            if (res.status == '1') { //显示登录结果             
                                console.log('添加成功');
                                this.$message({
                                    showClose: true,
                                    message: '书籍添加成功',
                                    type: 'success',
                                    center: true
                                });
                                this.reload();
                            } else {
                                console.log('添加失败');
                                this.$message({
                                    showClose: true,
                                    message: '书籍添加失败！请稍后重试！',
                                    type: 'error',
                                    center: true
                                });
                            }
                        });
                    } else {
                        console.log('error!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            deleteBook(ID) {
                this.$confirm('确定删除该书籍？', 'Delete', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('https://www.xiaoqw.online/smallFrog-manager/server/deleteBook.php', ID).then(response => {
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
            },
            // 添加书籍
            openAddBook() {
                this.editVisible2 = true;
            },
        }
    }
</script>

<style scoped>
    .bookContent {
        text-align: justify;
        padding-left: 10%;
        padding-right: 10%;
        line-height: 25px;
        margin-bottom: 10px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .bookImg {
        width: 50px;
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
        float: right;
    }
</style>