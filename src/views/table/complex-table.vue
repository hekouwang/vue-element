<template>
  <div class="app-container">
    <!--    <div class="filter-container">-->
    <!--      <el-button class="filter-item" type="primary" @click="handleDownload">-->
    <!--        {{ $t('核心账本') }}-->
    <!--      </el-button>-->
    <!--      <el-button class="filter-item" type="primary" @click="handleDownload">-->
    <!--        {{ $t('下金蛋的鹅') }}-->
    <!--      </el-button>-->
    <!--      <el-button class="filter-item" type="primary" @click="handleDownload">-->
    <!--        {{ $t('梦想存储罐') }}-->
    <!--      </el-button>-->
    <!--    </div>-->
    <div class="filter-container">
      账本：
      <el-select
        v-model="temp.consumeType"
        placeholder="请选择"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      分类：
      <el-cascader
        v-model="consumeItemListQuery.classifyList"
        :show-all-levels="false"
        :options="classifyOptions"
        :props="props"
        clearable
      />
      账户：
      <el-select
        v-model="temp.consumeType"
        placeholder="请选择"
        clearable
        style="width: 90px"
        multiple
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      商家：
      <el-select
        v-model="temp.merchantList"
        placeholder="请选择"
        clearable
        style="width: 90px"
        multiple
        class="filter-item"
      >
        <el-option v-for="item in merchantList1" :key="item.id" :label="item.merchantName" :value="item.id" />
      </el-select>
      项目：
      <el-select
        v-model="consumeItemListQuery.projectList"
        placeholder="请选择"
        clearable
        style="width: 90px"
        multiple
        class="filter-item"
      >
        <el-option v-for="item in projectList1" :key="item.id" :label="item.projectName" :value="item.id" />
      </el-select>
      成员：
      <el-select
        v-model="consumeItemListQuery.relationList"
        placeholder="请选择"
        clearable
        style="width: 90px"
        multiple
        class="filter-item"
      >
        <el-option v-for="item in relationList1" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div class="filter-container">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="consumeItemListQuery.startAndEndTime"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button id="text" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>

    </div>
    <div class="app-container">
      <table>
        <tr>
          <td><span style="font-size: 22px">日期</span>&nbsp;<span v-if="totalCount !=''">{{ totalCount.endTime }} </span>~ &nbsp;
            <span v-if="totalCount !=''">{{ totalCount.startTime }}</span></td>
          <td />
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td><span style="font-size: 12px">总收入</span>&nbsp;<span style="color: red;font-size: 22px">{{ totalCount.totalIncome }}</span></td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td><span style="font-size: 12px">总支出</span>&nbsp;<span style="color: green;font-size: 22px">{{ totalCount.totalExpense }}</span></td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td />
          <td><span style="font-size: 12px">结余</span>&nbsp;<span style="font-size: 22px">{{ totalCount.toalRemain }}</span></td>
        </tr>
      </table>
    </div>
    <template>
      <div class="layout">

        <el-table :data="list">
          <!--                  :expand-row-keys="expends" :row-key="getRowKeys"-->
          <!--                  :default-expand-all="false">-->

          <el-table-column
            align="center"
            label="日期"
            prop="date"
          />

          <el-table-column
            align="center"
            label="收入"
            prop="in"
          >
            <template scope="scope">
              <span style="color: red">{{ scope.row.in }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="支出"
            prop="out"
          >
            <template scope="scope">
              <span style="color: green">{{ scope.row.out }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="toogleExpand(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column type="expand">

            <template slot-scope="scope">
              <el-table
                :key="tableKey"
                ref="“table”"
                v-loading="listLoading"
                :data="scope.row.cconsumeItemReturnDTOList"
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
              >
                <el-table-column prop="classifyName" label="分类" />
                <el-table-column prop="consumeType" :formatter="formatterData" label="类型" min-width="60px" />
                <el-table-column prop="money" label="金额" min-width="60px" />
                <el-table-column prop="sourceAccountName" label="源账户" />
                <el-table-column prop="merchantName" label="商家" />
                <el-table-column prop="relationName" label="成员" />
                <el-table-column prop="targetAccountName" label="目标账户" />
                <el-table-column prop="projectName" label="项目名" />
                <el-table-column prop="remark" label="备注" />
                <el-table-column prop="createTime" label="时间" min-width="120px" />
              </el-table>
            </template>

          </el-table-column>

        </el-table>
      </div>
    </template>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="记账类型">
          <el-select
            v-model="temp.consumeType"
            placeholder="请选择记账类型"
            clearable
            style="width: 90px"
            class="filter-item"
            @change="handleChange"
          >
            <el-option v-for="item in typeOptions" :key="item.key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item v-show="temp.consumeType !=3" label="分类" prop="classifyId">
          <el-cascader
            v-model="temp.classifyId"
            :options="classifyOptions"
            :props="{ expandTrigger: 'hover' }"
          />
        </el-form-item>
        <el-form-item label="源账户" prop="sourceAccount" >
          <el-cascader
            v-model="temp.sourceAccount"
            placeholder="请选择源账户"
            :options="accountList1"
            :props="{ expandTrigger: 'hover' }"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item v-show="temp.consumeType==3" label="目标账户" prop="targetAccount" >
          <el-cascader
            v-model="temp.targetAccount"
            placeholder="请选择目标账户"
            :options="accountList1"
            :props="{ expandTrigger: 'hover' }"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="temp.money" />
        </el-form-item>
        <el-form-item label="成员" prop="relationId">
          <el-select
            v-model="temp.relationId"
            placeholder="请选择成员"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option v-for="item in relationList1" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="70px" label="选择时间" class="postInfo-container-item">
          <el-date-picker
            v-model="temp.createTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择时间"
          />
        </el-form-item>
        <el-form-item label="项目" prop="projectId">
          <el-select
            v-model="temp.projectId"
            placeholder="请选择项目"
            clearable
            style="width: 400px"
            class="filter-item"
          >
            <el-option v-for="item in projectList1" :key="item.id" :label="item.projectName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商家" prop="merchantId">
          <el-select
            v-model="temp.merchantId"
            placeholder="请选择商家"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option v-for="item in merchantList1" :key="item.id" :label="item.merchantName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle,
  addOneExpand,
  tranferAccount,
  addOneIncome,
  accountList,
  classifyList,
  relationList,
  classifyByGroup,
  merchantList,
  projectList,
  listAccountByGroupSelect
} from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      totalCount: {
        endTime:null,
        startTime:null,
        totalIncome:0,
        totalExpense:0,
        toalRemain:0
      },
      accountList1: null,
      classifyList1: null,
      relationList1: null,
      merchantList1: null,
      projectList1: null,
      listLoading: true,
      classifyOptions: null,
      startAndEndTime: null,
      accountQuery: {

      },
      classifyQuery: {

      },
      relationQuery: {

      },
      merchantQuery: {

      },
      consumeItemListQuery: {
        classifyList: null,
        startAndEndTime: null,
        merchantList: [],
        projectList:[],
        relationList:[]
      },
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      typeOptions: [{ label: '支出', key: '1', value: 1 }, { label: '收入', key: '2', value: 2 },
        { label: '转账', key: '3', value: 3 }],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        consumeType: '',
        classifyId: '',
        sourceAccount: '',
        targetAccount: '',
        merchantList: '',
        money: '',
        relationId: '',
        createTime: '',
        projectId: '',
        merchantId: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      expends: [],
      props: { multiple: true, expandTrigger: 'hover' }
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    this.getList()
    this.getClassifyList()
    this.getRelationList()
    this.getMerchantList()
    this.getProjectList()
    this.listClassifyByGroup()
    this.listAccountByGroupSelect()
    this.temp.consumeType = this.typeOptions[0]
  },
  methods: {
    replace(input) {
      return input.replace('[', '').replace(']', '')
    },
    toogleExpand(row) {
      const $table = this.$refs.table
      this.list.map((item) => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
    },
    formatterData(row, column) {
      var checkType = ''
      switch (row.consumeType) {
        case 1:
          checkType = '支出'
          break
        case 2:
          checkType = '收入'
          break
        case 3:
          checkType = '转账'
          break
        default:
          checkType = '无'
      }
      return checkType
    },

    // 设置table中的扩展项，展开的id，此处我需要全部展开
    getExpends() {
      var Id = this.list.map(item => item.id)
      this.expends = Id
    },
    getRowKeys(row) {
      return row.id
    },
    getList() {
      this.listLoading = true
      fetchList(this.consumeItemListQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        if(this.total !=0){
          this.totalCount = response.data.totalCount
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    listAccountByGroupSelect() {
      this.listLoading = true
      listAccountByGroupSelect(this.accountQuery).then(response1 => {
        this.accountList1 = response1.data

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getClassifyList() {
      this.listLoading = true
      classifyList(this.classifyQuery).then(response1 => {
        this.classifyList1 = response1.data
        this.total = 2

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getRelationList() {
      this.listLoading = true
      relationList(this.relationQuery).then(response1 => {
        this.relationList1 = response1.data
        this.total = 2

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getMerchantList() {
      this.listLoading = true
      merchantList(this.merchantQuery).then(response1 => {
        this.merchantList1 = response1.data
        this.total = 2

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getProjectList() {
      this.listLoading = true
      projectList(this.merchantQuery).then(response1 => {
        this.projectList1 = response1.data
        this.total = 2

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
    handleChange(item){
        if(item==1){
          this.classifyQuery.classifyType=1
          this.listClassifyByGroup();
        }else if(item==2){
          this.classifyQuery.classifyType=2
          this.listClassifyByGroup();
        }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        consumeType: '',
        classifyId: '',
        sourceAccount: '',
        targetAccount: '',
        money: '',
        relationId: '',
        createTime: '',
        projectId: '',
        merchantId: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.classifyId = this.temp.classifyId[1]
          this.temp.sourceAccount = this.temp.sourceAccount[1]
          if(null != this.temp.targetAccount){
            this.temp.targetAccount = this.temp.targetAccount[1]
          }
          if (this.temp.consumeType == 1) {
            addOneExpand(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          } else if (this.temp.consumeType === 2) {
            addOneIncome(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          } else if (this.temp.consumeType === 3) {
            tranferAccount(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
