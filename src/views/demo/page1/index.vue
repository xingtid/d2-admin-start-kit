<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                label="编号"
                width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.uid }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="姓名"
                width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.uname }}</p>
                    <p>住址: {{ scope.row.uPhone }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.uname }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
      <el-table-column
              label="时间"
              width="220">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.uloginAt }}</span>
        </template>
      </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
  import axios from 'axios'

  const components = {}
  export default {
    components,
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      getList () {
        axios.get('/login/findAll'
        ).then(res => {
          console.log( res.data.data)
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
