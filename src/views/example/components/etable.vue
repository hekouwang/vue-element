<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="classifyName"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
    </el-table-column>
  </el-table>
</template>

<script>
  import Bus from './bus.js'
  import { getClassifyByIdOrParentId } from '../../../api/article'

  export default {
    name: 'eatable',
    data() {
      return {
        tableData: null,
        classifyQuery: {}
      }
    },
    mounted() {
      Bus.$on('val', (data) => {
        console.log('接收到的数据是' + data.label)
        this.classifyQuery.id = data.id,
        this.classifyQuery.parentId = data.parentId
        this.getClassifyByIdOrParentId()
      })
    },
    methods: {
      getClassifyByIdOrParentId() {
        this.listLoading = true
        getClassifyByIdOrParentId(this.classifyQuery).then(response1 => {
          this.tableData = response1.data
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    }
  }
</script>
