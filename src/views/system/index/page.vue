<template>
    <d2-container type="full" class="page">
        <d2-grid-layout
                v-bind="layout"
                @layout-updated="layoutUpdatedHandler">
            <d2-grid-item
                    v-for="(item, index) in layout.layout"
                    :key="index"
                    v-bind="item"
                    @resize="resizeHandler"
                    @move="moveHandler"
                    @resized="resizedHandler"
                    @moved="movedHandler">
                <el-card shadow="never" class="page_card">

                    <template v-if="item.i === '0'" >
                      <el-tag size="mini" type="info" slot="header" >今日打卡</el-tag>
                      <div class="d2-mb"><span style="padding: 5px;color: blue;" >{{gettime}}</span></div>
                        <div class="d2-mb"><el-button>点击签到</el-button></div>
                    </template>
                    <template v-if="item.i === '1'">
                        <div class="d2-mb neiqian">
                      <el-progress :text-inside="true" :stroke-width="26" :percentage="70" :show-text="true"></el-progress>
                      <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
                      <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
                      <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
                        </div>
                    </template>
                    <template v-if="item.i === '2'">
                      <el-container>
                        <el-header>Header</el-header>
                        <el-main>Main</el-main>
                      </el-container>
                      <el-container>
                        <el-header>Header</el-header>
                        <el-main>Main</el-main>
                      </el-container>
                      <el-container>
                        <el-header>Header</el-header>
                        <el-main>Main</el-main>
                      </el-container>
                    </template>
                    <template v-if="item.i === '3'">
                        <div class="d2-mb">片调整位置</div>
                        <div class="d2-mb">拖拽卡片右下角的手柄调整卡片大小</div>
                        <div class="d2-mb">在控制台打印出数据变化</div>
                    </template>
                </el-card>
            </d2-grid-item>
        </d2-grid-layout>
    </d2-container>
</template>

<script>
    export default {
        data() {
            return {
              layout: {
                layout: [
                  {'x': 0, 'y': 0, 'w': 3, 'h': 7, 'i': '0'},
                  {'x': 3, 'y': 0, 'w': 9, 'h': 7, 'i': '1'},
                  {'x': 0, 'y': 17, 'w': 7, 'h': 8, 'i': '2'},
                  {'x': 0, 'y': 7, 'w': 12, 'h': 10, 'i': '3'},
                  {'x': 7, 'y': 17, 'w': 5, 'h': 8, 'i': '4'}
                ],
                colNum: 12,
                rowHeight: 30,
                isDraggable: true,
                isResizable: true,
                isMirrored: false,
                verticalCompact: true,
                margin: [10, 10],
                useCssTransforms: true
              },
              gettime: ''
            }
        },

        mounted() {
            // 加载完成后显示提示
            this.showInfo()
            this.currentTime();
        },
        methods: {
          getTime:function(){
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
          },
            log(arg1 = 'log', ...logs) {
                if (logs.length === 0) {
                    console.log(arg1)
                } else {
                    console.group(arg1)
                    logs.forEach(e => {
                        console.log(e)
                    })
                    console.groupEnd()
                }
            },
          currentTime(){
            setInterval(this.getTime,500)
          },
            // 显示提示
            showInfo() {
                this.$notify({
                    title: '提示',
                    message: '你可以按住卡片拖拽改变位置；或者在每个卡片的右下角拖动，调整卡片大小'
                })
            },
            // 测试代码
            layoutUpdatedHandler(newLayout) {
                console.group('layoutUpdatedHandler')
                newLayout.forEach(e => {
                    console.log(`{'x': ${e.x}, 'y': ${e.y}, 'w': ${e.w}, 'h': ${e.h}, 'i': '${e.i}'},`)
                })
                console.groupEnd()
            },
            resizeHandler(i, newH, newW) {
                this.log('resizeHandler', `i: ${i}, newH: ${newH}, newW: ${newW}`)
            },
            moveHandler(i, newX, newY) {
                this.log('moveHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`)
            },
            resizedHandler(i, newH, newW, newHPx, newWPx) {
                this.log('resizedHandler', `i: ${i}, newH: ${newH}, newW: ${newW}, newHPx: ${newHPx}, newWPx: ${newWPx}`)
            },
            movedHandler(i, newX, newY) {
                this.log('movedHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        .vue-grid-layout {
            background-color: $color-bg;
            border-radius: 4px;
            margin: -10px;

            .page_card {
                height: 100%;
                @extend %unable-select;
            }

            .vue-resizable-handle {
                opacity: .3;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
    .el-progress{
      margin-bottom: 10px;
    }
  .neiqian{
    width: 350px;
  }
    .el-card__header{
      text-align: center;
    }
</style>

