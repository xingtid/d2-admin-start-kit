<template>
  <d2-container>
    <template slot="header" style="font-size: 22px;line-height: 34px;">
      <el-row :gutter="20">
        <el-col :span="6" ><div class="grid-content bg-purple" style="font-size: 22px;line-height: 34px;">发送群通知</div></el-col>

      </el-row>

    </template>
    <el-input v-model="id" placeholder="请输入id" style="width: 200px"></el-input>
    <el-input v-model="input" placeholder="请输入内容" style="width: 200px"></el-input>
    <el-button type="primary" @click="onSubmit">立即发送</el-button>
  </d2-container>
</template>

<script>
  import axios from 'axios'
export default {
  data(){
    return{
      input:'',
      id:'123123'
    }
  },
  methods:{
    onSubmit(){
      axios.get('/login/sendMsg/'+this.id+"/"+this.input
      ).then(res => {
        console.log(res.data.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
