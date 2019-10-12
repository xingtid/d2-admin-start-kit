<template>
    <d2-container>
        <template class="grid-content" slot="header">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="font-size: 22px;line-height: 34px;">文章信息</div>
                </el-col>
                <el-col :span="4" :offset="8">
                    <el-input v-model="key" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
                </el-col>
            </el-row>
            <span></span>

        </template>
        <el-table  v-loading="loading"
                   :data="tableData"
                   style="width: 100%">
            <el-table-column
                    label="编号"
                    width="260">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.vId }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户ID"
                    width="120">
                <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag> <el-link :underline="false" :href="'http://127.0.0.1:8088/getShare/vUid' + scope.row.sId" target="_blank" type="primary" size="medium">{{ scope.row.vUid}}</el-link></el-tag>
                        </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="时间"
                    width="200">
                <i class="el-icon-time"></i>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.vTime| dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="等级"
                    width="150">
                <template slot-scope="scope">

                        <div slot="reference" class="name-wrapper">
                            <span style="margin-left: 10px">{{ scope.row.vLevel}}</span>
                        </div>
                </template>

            </el-table-column>


            <el-table-column
                    label="剩余天数"
                    width="150">
                <template slot-scope="scope">

                    <div slot="reference" class="name-wrapper">
                        <span style="margin-left: 10px">{{ scope.row.vTimeLeft}}</span>天
                    </div>
                </template>

            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="recommend(scope.row.sId)">推荐
                    </el-button>
                    <el-button
                            @click="delInfo(scope.row.sId)"
                            slot="reference"
                            size="mini"
                            type="danger">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="block" style="text-align: center;">
            <el-pagination
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="visible"
                width="30%"
                :before-close="handleClose">
            <el-span>确定推荐？</el-span>
            <span slot="footer" class="dialog-footer">


    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="visible = false">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确认删除么？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="del()">确 定</el-button>
  </span>
        </el-dialog>
    </d2-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
  return{
      tableData: [],
      visible: false,
      dialogVisible: false,
      id: 0,
      key: '',
      loading: true
  }
    },
      methods: {
          getList () {
              axios.get('/login/findAllVIP'
              ).then(res => {
                  console.log(res.data.data)
                  this.tableData = res.data.data

              }).catch(error => {
                  console.log(error)
              })
              this.loading = false;
          },
          handleClose (done) {
          },
          delInfo (index) {
              console.log(index)
              this.id = index
              this.dialogVisible = true
          },
          editInfo (index) {
              this.id = index
              this.visible = true
          },
          del () {
              this.dialogVisible = false;
              axios.get('/login/delShare/'+this.id, {
              }).then(res => {
                  this.getList()
              }).catch(error => {
                  console.log(error)
              })
          },
          recommend () {
              this.visible = false;
              axios.get('/login/recShare/'+this.id, {
              }).then(res => {
                  this.getList()
              }).catch(error => {
                  console.log(error)
              })
          },
          search(){
              axios.get('/login/searchShare/'+this.key).then(res => {
                  this.tableData = res.data.data
              }).catch(error => {
                  console.log(error)
              })
          }
      },
      mounted () {
          this.loading = true;
          this.getList()
      }
  }
</script>
