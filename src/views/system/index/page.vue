<template>
  <d2-container type="card">
    <div style="height: 700px; margin: -16px;">
      <SplitPane :min-percent='20' :default-percent='30' split="vertical">
        <template slot="paneL"><div style="margin: 10px;text-align: center;">
          <el-tag>我的信息</el-tag>
        </div></template>
        <template slot="paneR">
          <SplitPane split="horizontal">
            <template slot="paneL"><div style="margin: 10px;">

            </div></template>
            <template slot="paneR"><div style="margin: 10px;">


            </div></template>
          </SplitPane>
        </template>
      </SplitPane>
    </div>
  </d2-container>
</template>

<script>
  export default {
    mounted () {
      // 加载完成后显示提示
      this.showInfo()
    },
    methods: {
      // 显示提示
      showInfo () {
        this.$notify({
          title: '提示',
          message: '在横向或者纵向的分割线上拖拽调整分区大小'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

