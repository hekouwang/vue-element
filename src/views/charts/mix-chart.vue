<template>
  <div class="chart-container">
    <div style="margin-top: 10px;margin-bottom: 20px;margin-left: 10px">
      分类：
      <el-cascader
        v-model="param.classifyList"
        :show-all-levels="false"
        :options="classifyOptions"
        :props="props"
        clearable
      />
      <el-button id="text" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>
    <chart height="70%" width="70%" :balance-list="balanceList" :classify-list="classifyList"
           :in-list="inList" :out-list="outList"/>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import {classifyByGroup, listConsumeItemBrokenLine} from '@/api/article'

export default {
  name: 'MixChart',
  components: {Chart},
  data() {
    return {
      chart: null,
      classifyList: [],
      inList: [],
      outList: [],
      balanceList: [],
      moneyList: [],
      param: {},
      classifyQuery: {},
      classifyOptions: null,
      classifyLevelChoose: [{label: '一级分类', key: '1', value: 1}, {label: '二级分类', key: '2', value: 2}],
      classifyTypeChoose: [{label: '支出', key: "1", value: 1}, {label: '收入', key: "2", value: 2}],
      props: { multiple: true, expandTrigger: 'hover' }
    }
  },
  created() {
    this.getList(),
      this.listClassifyByGroup()
  },
  methods: {
    getList() {
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
    listClassifyByGroup() {
      this.listLoading = true
      classifyByGroup(this.classifyQuery).then(response1 => {
        this.classifyOptions = response1.data
        this.total = 2

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
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

