<template>
    <d2-container>
        <template class="grid-content" slot="header">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="font-size: 22px;line-height: 34px;">用户信息</div>
                </el-col>
                <el-col :span="4" :offset="8">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
                    <span style="margin-left: 10px">{{ scope.row.uid }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.uname }}</p>
                        <p>ip: {{ scope.row.uip }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.uname }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="时间"
                    width="220">
                <i class="el-icon-time"></i>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.uloginAt| dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click="delInfo(scope.index)"
                            slot="reference"
                            size="mini"
                            type="danger">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确认删除么？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      axios.get('/login/findAll'
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
    editInfo (index) {
      this.id = index
      this.visible = true
    },
    del () {
      axios.get('/login/deluser', {
        params: {
          id: this.id
        }
      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data
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
