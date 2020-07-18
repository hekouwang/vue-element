<template>
  <div class="chart-container" >
    <div style="margin-top: 10px"></div>
    分类级别：
    <el-select
      v-model="param.classifyLevel"
      placeholder="请选择"
      clearable
      style="width: 120px"
      class="filter-item"
    >
      <el-option v-for="item in classifyLevelChoose" :key="item.key" :label="item.label" :value="item.value" />
    </el-select>
    类型：
    <el-select
      v-model="param.classifyType"
      placeholder="请选择"
      clearable
      style="width: 90px"
      class="filter-item"

    >
      <el-option v-for="item in classifyTypeChoose" :key="item.key" :label="item.label" :value="item.value" />
    </el-select>
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="param.startAndEndTime"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <el-button id="text" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
      {{ $t('table.search') }}
    </el-button>
    <div style="margin-bottom: 10px"></div>
    <chart height="90%" width="100%"   :classify-list1="classifyList1" :money-list="moneyList"/>

  </div>
</template>

<script>
  import Chart from '@/components/Charts/Keyboard'
  import { listConsumeItemGroupAndOrder } from '@/api/article'

  export default {
    name: 'KeyboardChart',
    components: { Chart },
    data() {
      return {
        chart: null,
        classifyList1: [],
        moneyList: [],
        param: {
          "classifyLevel":1,
          "classifyType":1
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
        listConsumeItemGroupAndOrder(this.param).then(response => {
          this.classifyList1 = response.data.classifyList
          this.moneyList = response.data.moneyList
          this.total = response.data.total
          this.totalCount = response.data.totalCount
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

