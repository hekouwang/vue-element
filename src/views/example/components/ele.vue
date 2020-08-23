<template>
<el-tree
  :data="data"
  :props="defaultProps"
  accordion
  @node-click="handleNodeClick">
</el-tree>
</template>
<script>
import Bus from './bus.js'
import { classifyByGroup, classifyList } from '../../../api/article'
export default {
  data() {
    return {
      data: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      classifyQuery: {

      },
    };
  },
  created() {
    this.listClassifyByGroup()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data.id);
      Bus.$emit('val',data);
    },
    listClassifyByGroup() {
      this.listLoading = true
      classifyByGroup(this.classifyQuery).then(response1 => {
        this.data = response1.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
  }
};
</script>
