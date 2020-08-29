<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    classifyList: {
      type: Array,
      required:true,
      default: () => {
        return []
      }
    },
    inList: {
      type: Array,
      required:true,
      default: () => {
        return []
      }
    },
    outList: {
      type: Array,
      required:true,
      default: () => {
        return []
      }
    },
    balanceList: {
      type: Array,
      required:true,
      default: () => {
        return []
      }
    }
  },
  //这里用watch方法来监听父组件传过来的值，来实现实时更新
  watch:{
    classifyList(val){    //message即为父组件的值，val参数为值
      this.initChart()    //将父组件的值赋给childrenMessage 子组件的值
    },
    inList(val){    //message即为父组件的值，val参数为值
      this.initChart()    //将父组件的值赋给childrenMessage 子组件的值
    },
    outList(val){    //message即为父组件的值，val参数为值
      this.initChart()    //将父组件的值赋给childrenMessage 子组件的值
    },
    balanceList(val){    //message即为父组件的值，val参数为值
      this.initChart()    //将父组件的值赋给childrenMessage 子组件的值
    }

  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 13; i++) {
          data.push(i + 'month')
        }
        return data
      }())
      this.chart.setOption({
        title: {
          text: '收支趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['收入', '支出', '结余']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.classifyList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '收入',
            type: 'line',
            data: this.inList,
            itemStyle : {
              normal: {
                label : {show: true},
                color: "#c92e2e",
                lineStyle: {
                  color: "#c92e2e"
                }
              }
            }
          },
          {
            name: '支出',
            type: 'line',
            data: this.outList,
            itemStyle : {
              normal: {
                label : {show: true},
                color: "#2ec93d",
                lineStyle: {
                  color: "#2ec93d"
                }
              }
            }
          },
          {
            name: '结余',
            type: 'line',
            data: this.balanceList,
            itemStyle : {  normal: {
                label : {show: true},
                color: "#2ec4c9",
                lineStyle: {
                  color: "#2ec4c9"
                }
              }}
          }
        ]
      })
    }
  }
}
</script>
