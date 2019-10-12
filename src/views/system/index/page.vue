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

                    <template v-if="item.i === '0'">
                        <el-tag size="mini" type="info" slot="header">今日打卡</el-tag>
                        <div class="d2-mb"><span style="padding: 5px;color: blue;">{{gettime}}</span></div>
                        <div class="d2-mb">
                            <el-button>点击签到</el-button>
                        </div>
                    </template>
                    <template v-if="item.i === '1'">
                        <el-tag size="" type="info" slot="header"></el-tag>
                        <div class="d2-mb neiqian">
                            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"
                                         :show-text="true"></el-progress>
                            <el-progress :text-inside="true" :stroke-width="24" :percentage="100"
                                         status="success"></el-progress>
                            <el-progress :text-inside="true" :stroke-width="22" :percentage="80"
                                         status="warning"></el-progress>
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="50"
                                         status="exception"></el-progress>
                        </div>
                    </template>
                    <template v-if="item.i === '2'">
                        <div :click="solr()">加入索引库</div>
                    </template>
                    <template v-if="item.i === '3'">
                        <el-tag size="mini" type="info" slot="header">网站概况</el-tag>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-card shadow="never" class="d2-card d2-mb" style="background: rgb(64, 158, 255);width: 300px">
                                    <p slot="title"></p>
                                    <div class="group" >
                                        <div >会员数</div>
                                        <d2-count-up :start="124" :end="100"/>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="never" class="d2-card d2-mb" style="background: #F56C6C;width: 300px">
                                    <p slot="title">设置起止数值</p>
                                    <div class="group" >
                                        <div>文章数</div>
                                        <d2-count-up :start="124" :end="100"/>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="4">
                                <el-card shadow="never" class="d2-card d2-mb" style="background: #67C23A;width: 300px">
                                    <p slot="title">设置起止数值</p>
                                    <div class="group">
                                        <div>设计师数 </div>
                                        <d2-count-up :start="124" :end="100"/>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-if="item.i === '4'">

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
                         {'x': 0, 'y': 17, 'w': 2, 'h': 5, 'i': '2'},
                        {'x': 0, 'y': 7, 'w': 12, 'h': 10, 'i': '3'},
                        {'x': 2, 'y': 17, 'w': 10, 'h': 8, 'i': '4'}
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
                gettime: '',
                urls: [
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                ]
            }
        },

        mounted() {
            // 加载完成后显示提示
            this.showInfo()
            this.currentTime();
        },
        methods: {
            getTime: function () {
                var _this = this;
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth() + 1;
                let dd = new Date().getDate();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
            },
            solr(){
                // location.href="localhost:8088/solr"
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
            update() {
                setTimeout(() => {
                    this.end = 100
                }, 1000)
            },
            currentTime() {
                setInterval(this.getTime, 500)
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

    .el-progress {
        margin-bottom: 10px;
    }

    .neiqian {
        width: 350px;
    }

    .el-card__header {
        text-align: center;
    }

    .group {
        text-align: center;
        font-size: 28px;
        color: white;

    }
</style>

