<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
  import { fetchList, listConsumeItemGroupAndOrder } from '@/api/article'

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
        chart: null,
        classifyList: null,
        moneyList: null,
        param: {}
      }
    },
    created() {
      this.getList()
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
      getList() {
        this.listLoading = true
        listConsumeItemGroupAndOrder(this.param).then(response => {
          this.classifyList = response.data.classifyList
          this.moneyList = response.data.moneyList
          this.total = response.data.total
          this.totalCount = response.data.totalCount
          this.initChart()
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
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
              text: '一级分类支出'
              // subtext: '数据来自网络'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['实际数据'
                // , '2012年'
              ]
            },
            grid: {
              // left: '3%',
              //   right: '4%',
              //   bottom: '3%',
              //   containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: this.classifyList
            },
            series: [
              {
                name: '实际数据',
                type: 'bar',
                data: this.moneyList,
                itemStyle: {
                  normal: {
                    label: {
                      show: true, //开启显示
                      position: 'right', //在上方显示
                      textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14
                      }
                    }
                  }
                }
              }
              // ,
              // {
              //   name: '2012年',
              //   type: 'bar',
              //   data: [19325, 23438, 31000, 121594, 134141, 681807]
              // }
            ]
          }
        )
      }
    }
  }
</script>
