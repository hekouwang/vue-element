<template>
  <div class="app-container">
    <div class="filter-container">
      状态：
      <el-select v-model="listQuery.status" placeholder="请选择状态" clearable style="width: 90px"
                 class="filter-item">
        <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.value"/>
      </el-select>

      用户名称：
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <div class="app-container">
    </div>
    <template>
      <div class="layout">

        <el-table :data="list" stripe>
          <!--                  :expand-row-keys="expends" :row-key="getRowKeys"-->
          <!--                  :default-expand-all="false">-->

          <el-table-column align="center"
                           label="编号"
                           prop="id">
          </el-table-column>
          <el-table-column align="center"
                           label="心愿名称"
                           prop="name">
          </el-table-column>
          <el-table-column align="center"
                           label="心愿总额(元)"
                           prop="totalMoney">
          </el-table-column>
          <el-table-column align="center"
                           label="每日攒钱(元)"
                           prop="dayMoney">
          </el-table-column>
          <el-table-column align="center"
                           label="心愿余额(元)"
                           prop="balance">
          </el-table-column>
          <el-table-column align="center"
                           label="预计完成时间"
                           prop="accomplishTime">
          </el-table-column>
          <el-table-column align="center"
                           label="倒数日"
                           prop="apartDays">
          </el-table-column>
          <el-table-column align="center"
                           label="创建时间"
                           prop="createTime">
          </el-table-column>
          <el-table-column align="center"
                           label="心愿状态"
                           prop="status">
            <template scope="scope">
              <span v-if='scope.row.status==="doing"' style="color: #2ac06d">进行中</span>
              <span v-if='scope.row.status==="finished"' style="color: #3b91b6;">已完成</span>
              <span v-if='scope.row.status==="canceled"' style="color: red">已取消</span>
            </template>
          </el-table-column>


          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog title="创建心愿" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="reqWish" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="心愿名称" prop="name">
          <el-input v-model="reqWish.name"/>
        </el-form-item>
        <el-form-item label="源账户" prop="account">
          <el-select v-model="reqWish.accountId" placeholder="请选择账户" clearable style="width: 200px"
                     class="filter-item">
            <el-option v-for="item in accountList1" :key="item.accountName" :label="item.accountName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="totalMoney">
          <el-input v-model="reqWish.totalMoney"/>
        </el-form-item>
        <el-form-item label="每日攒钱" prop="dayMoney">
          <el-input v-model="reqWish.dayMoney"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="createData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>


    <el-dialog title="编辑心愿" :visible.sync="dialogFormUpdate">
      <el-form :model="updateWish" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="心愿id" prop="id">
          <el-input v-model="updateWish.id" readonly/>
        </el-form-item>
        <el-form-item label="心愿名称" prop="name">
          <el-input v-model="updateWish.name"/>
        </el-form-item>
        <el-form-item label="源账户" prop="account">
          <el-select v-model="updateWish.accountId" placeholder="请选择账户" clearable style="width: 200px"
                     class="filter-item">
            <el-option v-for="item in accountList1" :key="item.accountName" :label="item.accountName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="totalMoney">
          <el-input v-model="updateWish.totalMoney"/>
        </el-form-item>
        <el-form-item label="每日攒钱" prop="dayMoney">
          <el-input v-model="updateWish.dayMoney"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="updateWish.status"
            placeholder="请选择状态"
            clearable
            style="width: 200px"
            class="filter-item"
            @change="change()"
          >
            <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateWishData()">确 定</el-button>
      </div>
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
  addOneIncome, accountList, classifyList, listWish, addWish, listWishAccount, updateWish
} from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination

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
      totalCount: null,
      accountList1: null,
      classifyList1: null,
      listLoading: true,
      accountQuery: {},
      classifyQuery: {},
      test1: {
        id: 1
      },
      listQuery: {
        current: 1,
        pageSize: 20
      },
      importanceOptions: [1, 2, 3],
      statusList: [{ label: '已完成', key: '1', value: 'finished' }, { label: '已取消', key: '2', value: 'canceled' },
        { label: '进行中', key: '3', value: 'doing' }],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      reqWish: {
        name: '',
        accountId: '',
        totalMoney: '',
        dayMoney: '',
        remark: '',
        status:''
      },
      updateWish: {
        name: '',
        accountId: '',
        totalMoney: '',
        dayMoney: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogFormUpdate: false,
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
      expends: []
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
    this.getAccountList()
    this.getClassifyList()
    // this.reqWish.consumeType=this.typeOptions[0]
  },
  methods: {
    change(){
      this.$forceUpdate()
    },
    getList() {
      this.listLoading = true
      listWish(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        // this.totalCount=response.data.totalCount

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getAccountList() {
      this.listLoading = true
      listWishAccount(this.accountQuery).then(response1 => {
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
    resetreqWish() {
      this.reqWish = {
        consumeType: 0,
        classifyId: '',
        sourceAccount: '',
        targetAccount: '',
        money: 0,
        relationId: '',
        createTime: '',
        projectId: '',
        merchantId: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetreqWish()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addWish(this.reqWish).then(() => {
            this.list.unshift(this.reqWish)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateWishData() {
      updateWish(this.updateWish).then(() => {
        this.list.unshift(this.reqWish)
        this.dialogFormUpdate = false
        this.getList()
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })

    },
    handleUpdate(row) {
      // this.resetreqWish()
      console.log('row:', row)
      this.updateWish.id = row.id
      this.updateWish.name = row.name
      this.updateWish.totalMoney = row.totalMoney
      this.updateWish.dayMoney = row.dayMoney
      this.updateWish.accountId = row.accountId
      this.updateWish.status = row.status
      this.dialogFormUpdate = true
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const reqWishData = Object.assign({}, this.reqWish)
          reqWishData.timestamp = +new Date(reqWishData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(reqWishData).then(() => {
            const index = this.list.findIndex(v => v.id === this.reqWish.id)
            this.list.splice(index, 1, this.reqWish)
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
