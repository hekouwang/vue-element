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
    classifyList1: {
      type: Array,
      required:true,
      default: () => {
        return []
      }
    },
    moneyList: {
      type: Array,
      required:true,
      default: () => {
        return []
      }
    }
  },
  //这里用watch方法来监听父组件传过来的值，来实现实时更新
  watch:{
    classifyList1(val){    //message即为父组件的值，val参数为值
      this.initChart()    //将父组件的值赋给childrenMessage 子组件的值
    },
    moneyList(val){    //message即为父组件的值，val参数为值
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

      this.chart.setOption({
        title: {
          text: '数据统计',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.classifyList1
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.moneyList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]







      })
    }
  }
}
</script>
