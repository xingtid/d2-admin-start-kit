<template>
    <d2-container>
        <template class="grid-content" slot="header">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="font-size: 22px;line-height: 34px;">设计师审批</div>
                </el-col>

            </el-row>
            <span></span>

        </template>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="编号"
                    width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.rId }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="图片"
                    width="240">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        <div class="demo-image__preview">
                        <el-image  :src="scope.row.rImg"  alt="" width="200px" height="120px"></el-image>
                    </div>
                         </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.rName }}</p>
                        <p>备注: {{ scope.row.rMark }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.rName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="时间"
                    width="220">
                <i class="el-icon-time"></i>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.rTime| dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click="delInfo(scope.row.rId)"
                            slot="reference"
                            size="mini"
                            type="danger">批准
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确认批准么？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="del">确 定</el-button>
  </span>
        </el-dialog>
    </d2-container>
</template>

<script>
    import axios from 'axios'
    const components = {}
    export default {
        components,
        data () {
            return {
                tableData: [],
                visible: false,
                dialogVisible: false,
                id: 0,
                input: ''
            }
        },
        methods: {
            getList () {
                axios.get('/login/findAllCertified'
                ).then(res => {
                    console.log(res.data.data)
                    this.tableData = res.data.data
                }).catch(error => {
                    console.log(error)
                })
            },
            handleClose (done) {
            },
            delInfo (index) {
                this.id = index
                this.dialogVisible = true
            },
            del () {
                axios.get('/login/changeState', {
                    params: {
                        id: this.id
                    }
                }).then(res => {
                    console.log(res.data.data)
                    this.tableData = res.data.data
                    this.dialogVisible = false
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted () {
            this.getList()
        }
    }
</script>
