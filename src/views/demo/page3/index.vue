<template>
  <d2-container>
    <template class="grid-content" slot="header">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple" style="font-size: 22px;line-height: 34px;">文章信息</div>
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
          <span style="margin-left: 10px">{{ scope.row.sId }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="标题"
              width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>作者: {{ scope.row.sTitle }}</p>
            <p>住址: {{ scope.row.uPhone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sTitle}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
              label="时间"
              width="220">
        <i class="el-icon-time"></i>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sTime| dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="时间"
              width="220">
        <i class="el-icon-time"></i>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sTime| dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.index, scope.row)">编辑
          </el-button>
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
export default {
  data(){
    return{
      tableData: [],
      visible: false,
      dialogVisible: false,
      id: 0,
      input: ''
    }
  },
  methods: {
    getList () {
      axios.get('/login/findAllShare'
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
