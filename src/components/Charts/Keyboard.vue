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

      const xAxisData = []
      const data = []
      const data2 = []
      for (let i = 0; i < 50; i++) {
        xAxisData.push(i)
        data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
      }
      this.chart.setOption({
        title: {
        text: '世界人口总量',
          subtext: '数据来自网络'
      },
      tooltip: {
        trigger: 'axis',
          axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['2011年'
          // , '2012年'
        ]
      },
      grid: {
        left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
        type: 'value',
          boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
      },
      series: [
        {
          name: '2011年',
          type: 'bar',
          data: [630230,18203, 23489, 29034, 104970, 131744]
        }
        // ,
        // {
        //   name: '2012年',
        //   type: 'bar',
        //   data: [19325, 23438, 31000, 121594, 134141, 681807]
        // }
      ]}
      )
    }
  }
}
</script>
