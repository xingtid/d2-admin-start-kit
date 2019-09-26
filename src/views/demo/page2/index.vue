<template>
    <d2-container>
        <template slot="header" style="font-size: 22px;line-height: 34px;">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="font-size: 22px;line-height: 34px;">会员信息</div>
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
        Hello World
    </d2-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
  return{
    tableData: [],
    input:''
  }
    },
    methods: {
      getList () {
        // axios.get('/login/findVip'
        // ).then(res => {
        //   console.log(res.data.data)
        // }).catch(error => {
        //   console.log(error)
        // })
      }, mounted () {
        this.getList()
      }
    }
  }
</script>
