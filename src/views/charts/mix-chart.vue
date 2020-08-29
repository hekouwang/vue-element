<template>
  <div class="chart-container">
    <chart height="80%" width="80%"  :balance-list="balanceList" :classify-list="classifyList"
           :in-list="inList" :out-list="outList"  />
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import { listConsumeItemBrokenLine } from '@/api/article'
export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      chart: null,
      classifyList: [],
      inList: [],
      outList: [],
      balanceList: [],
      moneyList: [],
      param: {

      },
      classifyLevelChoose: [{ label: '一级分类', key: '1', value: 1 }, { label: '二级分类', key: '2', value: 2 }],
      classifyTypeChoose: [{ label: '支出', key:"1", value: 1 }, { label: '收入', key: "2", value: 2 }]
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      this.listLoading = true
      listConsumeItemBrokenLine(this.param).then(response => {
        this.classifyList = response.data.classifyList
        this.inList = response.data.inList
        this.outList = response.data.outList
        this.classifyList = response.data.classifyList
        this.balanceList = response.data.balanceList
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.getList()
    },
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

