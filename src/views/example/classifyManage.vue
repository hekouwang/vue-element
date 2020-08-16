<template>
  <div>
    <ele class="ele"></ele>
    <eatable class="eatable"></eatable>
  </div>
</template>
<script>
import ele from './components/ele'
import eatable from './components/etable'


export default {
  components: {ele, eatable},
  data() {
    return {}
  },
}
</script>
<style>
.ele {
  float: left;
  width: 30%;
}
.eatable{
  float: right;
  width: 65% !important;
}
</style>
