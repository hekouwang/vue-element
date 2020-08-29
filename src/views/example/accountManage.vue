<template>
  <div style="margin-top: 50px;margin-left: 40px">

    <accountEle class="ele"></accountEle>
    <accountEatable class="eatable"></accountEatable>
  </div>
</template>
<script>

import accountEle from './components/accountEle'
import accountEatable from './components/accountEtable'


export default {
  components: {accountEle, accountEatable},
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
