<template>
    <el-container>
        <el-card style="width: 50%;">
            <ve-histogram :data="chartData" :colors="colors" width="100%"></ve-histogram>
        </el-card>
    </el-container>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            this.colors = ['#7f95d1','#ff82a9', '#ffc0be']
            return {
                chartData: {
                    columns: ['类别', '数量', '库存量'],
                    rows: [{
                            '类别': '计算机类',
                            '数量': 30,
                            '库存量': 2000
                        },
                        {
                            '类别': '英语类',
                            '数量': 20,
                            '库存量': 3000
                        },
                        {
                            '类别': '其他类',
                            '数量': 100,
                            '库存量': 1000
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    
</style>