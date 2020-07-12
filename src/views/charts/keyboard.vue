<template>
  <div class="chart-container" >
    <div style="margin-top: 10px"></div>
    成员：
    <el-select
      v-model="param.consumeType"
      placeholder="请选择"
      clearable
      style="width: 90px"
      multiple
      class="filter-item"
    >
      <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
    </el-select>
    成员：
    <el-select
      v-model="param.consumeType"
      placeholder="请选择"
      clearable
      style="width: 90px"
      multiple
      class="filter-item"
    >
      <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
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
    <chart height="90%" width="100%"/>

  </div>
</template>

<script>
  import Chart from '@/components/Charts/Keyboard'

  export default {
    name: 'KeyboardChart',
    components: { Chart },
    data() {
      return {
        chart: null,
        classifyList: null,
        moneyList: null,
        param: {}
      }
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

