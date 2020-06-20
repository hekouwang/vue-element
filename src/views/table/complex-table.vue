<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="handleDownload">
        {{ $t('核心账本') }}
      </el-button>
      <el-button class="filter-item" type="primary" @click="handleDownload">
        {{ $t('下金蛋的鹅') }}
      </el-button>
      <el-button class="filter-item" type="primary" @click="handleDownload">
        {{ $t('梦想存储罐') }}
      </el-button>
    </div>
    <div class="filter-container">
      <el-select v-model="temp.consumeType" :placeholder="$t('table.importance')" clearable style="width: 90px"
                 class="filter-item">-->
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="temp.consumeType" :placeholder="$t('table.importance')" clearable style="width: 90px"
                 class="filter-item">-->
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <!--      <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px" class="filter-item">-->
      <!--        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />-->
      <!--      </el-select>-->
      <!--      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">-->
      <!--        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />-->
      <!--      </el-select>-->
      <!--      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
      <!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
      <!--      </el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.reviewer') }}
      </el-checkbox>
    </div>

    <template>
      <div class="layout">

        <el-table :data="list" :expand-row-keys="expends" :row-key="getRowKeys"
                  :default-expand-all="false">

          <el-table-column align="center"
                           label="日期"
                           prop="date">
          </el-table-column>

          <el-table-column type="expand">

            <template slot-scope="scope">
              <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="scope.row.cconsumeItemReturnDTOList"
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
              >
                <el-table-column prop="classifyName" label="分类"></el-table-column>
                <el-table-column prop="consumeType" :formatter="formatterData" label="类型">

                </el-table-column>
                <el-table-column prop="money" label="金额"></el-table-column>
                <el-table-column prop="sourceAccountName" label="源账户"></el-table-column>
                <el-table-column prop="merchantName" label="商家"></el-table-column>
                <el-table-column prop="targetAccountName" label="目标账户"></el-table-column>
                <el-table-column prop="projectName" label="项目名"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="createTime" label="时间" min-width="100px"></el-table-column>
                <!--              <div class="tab_header">-->
                <!--                <span style="font-weight:600;">{{scope.row.out}}</span>-->
                <!--              </div>-->

                <!-- 这里要实现 多个表格共用一个表头，故需做判断，当表格要渲染的数据为default这个数组的时候，才显示表头的label值 -->
                <!-- 注意：当label无值的时候，还是会占用空间，故当前表格在页面上会出现一个代表表头的空行，需要手动更改（重写）Element表格的 thead样式 -->

                <!--              <div v-for="item in scope.row.cconsumeItemReturnDTOList" >-->


                <!--                  <el-table-column  prop="id" label="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">-->
                <!--                    <template slot-scope="{item}">-->
                <!--                      <span>{{ item.id }}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  &lt;!&ndash;      <el-table-column label="日期" width="150px" align="center">&ndash;&gt;-->
                <!--                  &lt;!&ndash;        <template slot-scope="{row}">&ndash;&gt;-->
                <!--                  &lt;!&ndash;          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>&ndash;&gt;-->
                <!--                  &lt;!&ndash;        </template>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      </el-table-column>&ndash;&gt;-->
                <!--                  <el-table-column  label="分类" prop="item.classifyName" width="110px" align="center" >-->
                <!--&lt;!&ndash;&lt;!&ndash;                    <template slot-scope="{item}" pr>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;                      <span>{{ item.classifyName }}</span>&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;                    </template>&ndash;&gt;&ndash;&gt;-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column label="类型" width="110px" align="center">-->
                <!--                    <template slot-scope="{scope}">-->
                <!--                      <span v-if="item.consumeType==1">支出</span>-->
                <!--                      <span v-if="item.consumeType==2">收入</span>-->
                <!--                      <span v-if="item.consumeType==3">转账</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column label="金额" width="110px" align="center">-->
                <!--                    <template slot-scope="{scope}">-->
                <!--                      <span>{{ row.money }}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column label="账户" width="110px" align="center">-->
                <!--                    <template slot-scope="{row}">-->
                <!--                      <span>{{ row.sourceAccountName }}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column label="商家" width="110px" align="center">-->
                <!--                    <template slot-scope="{row}">-->
                <!--                      <span>{{ row.merchantName }}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column label="项目" width="110px" align="center">-->
                <!--                    <template slot-scope="{row}">-->
                <!--                      <span>{{ row.projectName }}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column label="备注" width="110px" align="center">-->
                <!--                    <template slot-scope="{row}">-->
                <!--                      <span>{{ row.remark }}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column label="对方账户" width="110px" align="center">-->
                <!--                    <template slot-scope="{row}">-->
                <!--                      <span>{{ row.targetAccountName }}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">-->
                <!--                    <template slot-scope="{row,$index}">-->
                <!--                      <el-button type="primary" size="mini" @click="handleUpdate(row)">-->
                <!--                        {{ $t('table.edit') }}-->
                <!--                      </el-button>-->
                <!--                      &lt;!&ndash;          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">&ndash;&gt;-->
                <!--                      &lt;!&ndash;            {{ $t('table.publish') }}&ndash;&gt;-->
                <!--                      &lt;!&ndash;          </el-button>&ndash;&gt;-->
                <!--                      &lt;!&ndash;          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">&ndash;&gt;-->
                <!--                      &lt;!&ndash;            {{ $t('table.draft') }}&ndash;&gt;-->
                <!--                      &lt;!&ndash;          </el-button>&ndash;&gt;-->
                <!--                      <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">-->
                <!--                        {{ $t('table.delete') }}-->
                <!--                      </el-button>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <!--                  &lt;!&ndash;      <el-table-column v-if="showReviewer" :label="$t('table.reviewer')" width="110px" align="center">&ndash;&gt;-->
                <!--                  &lt;!&ndash;        <template slot-scope="{row}">&ndash;&gt;-->
                <!--                  &lt;!&ndash;          <span style="color:red;">{{ row.reviewer }}</span>&ndash;&gt;-->
                <!--                  &lt;!&ndash;        </template>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      </el-table-column>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      <el-table-column :label="$t('table.importance')" width="80px">&ndash;&gt;-->
                <!--                  &lt;!&ndash;        <template slot-scope="{row}">&ndash;&gt;-->
                <!--                  &lt;!&ndash;          <svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="meta-item__icon" />&ndash;&gt;-->
                <!--                  &lt;!&ndash;        </template>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      </el-table-column>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      <el-table-column :label="$t('table.readings')" align="center" width="95">&ndash;&gt;-->
                <!--                  &lt;!&ndash;        <template slot-scope="{row}">&ndash;&gt;-->
                <!--                  &lt;!&ndash;          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>&ndash;&gt;-->
                <!--                  &lt;!&ndash;          <span v-else>0</span>&ndash;&gt;-->
                <!--                  &lt;!&ndash;        </template>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      </el-table-column>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      <el-table-column :label="$t('table.status')" class-name="status-col" width="100">&ndash;&gt;-->
                <!--                  &lt;!&ndash;        <template slot-scope="{row}">&ndash;&gt;-->
                <!--                  &lt;!&ndash;          <el-tag :type="row.status | statusFilter">&ndash;&gt;-->
                <!--                  &lt;!&ndash;            {{ row.status }}&ndash;&gt;-->
                <!--                  &lt;!&ndash;          </el-tag>&ndash;&gt;-->
                <!--                  &lt;!&ndash;        </template>&ndash;&gt;-->
                <!--                  &lt;!&ndash;      </el-table-column>&ndash;&gt;-->


              </el-table>
            </template>
            <!--              </div>-->

          </el-table-column>
          <el-table-column align="center"
                           label="收入"
                           prop="in" >
            <template scope="scope">
              <span style="color: red">{{ scope.row.in }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="支出"
                           prop="out">
            <template scope="scope">
              <span style="color: green">{{ scope.row.out }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <!--        <el-form-item :label="$t('table.type')" prop="type">-->
        <!--          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">-->
        <!--            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item :label="日期" prop="timestamp">-->
        <!--          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />-->
        <!--        </el-form-item>-->
        <el-form-item label="记账类型">
          <el-select v-model="temp.consumeType" :placeholder="$t('table.importance')" clearable style="width: 90px"
                     class="filter-item">-->
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="classifyId">
          <el-input v-model="temp.classifyId"/>
        </el-form-item>
        <el-form-item label="源账户" prop="sourceAccount">
          <el-select v-model="temp.sourceAccount" :placeholder="$t('table.importance')" clearable style="width: 90px"
                     class="filter-item">-->
            <el-option v-for="item in accountList1" :key="item.accountName" :label="item" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="目标账户" prop="targetAccount">
          <el-select v-model="temp.targetAccount" :placeholder="$t('table.importance')" clearable style="width: 90px"
                     class="filter-item">-->

            <el-option v-for="item in accountList1" :key="item.id" :label="item.accountName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="temp.money"/>
        </el-form-item>
        <el-form-item label="成员" prop="relationId">
          <el-input v-model="temp.relationId"/>
        </el-form-item>
        <el-form-item label-width="120px" label="选择时间" class="postInfo-container-item">
          <el-date-picker v-model="temp.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="Select date and time"/>
        </el-form-item>
        <el-form-item label="项目" prop="projectId">
          <el-input v-model="temp.projectId"/>
        </el-form-item>
        <el-form-item label="商家" prop="merchantId">
          <el-input v-model="temp.merchantId"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark"/>
        </el-form-item>

        <!--        <el-form-item :label="$t('table.status')">-->
        <!--          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">-->
        <!--            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item :label="$t('table.importance')">-->
        <!--          <el-rate v-model="temp.consumeType" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />-->
        <!--        </el-form-item>-->

        <!--        <el-form-item :label="$t('table.remark')">-->
        <!--          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item :label="$t('table.type')">-->
        <!--          <el-input v-model="temp.type" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item :label="$t('table.remark')">-->
        <!--          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item :label="$t('table.remark')">-->
        <!--          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item :label="$t('table.remark')">-->
        <!--          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item :label="$t('table.remark')">-->
        <!--          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--        </el-form-item>-->

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
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
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
    addOneIncome, accountList
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
        accountList1:null,
        listLoading: true,
        accountQuery:{

        },
        test1: {
          id: 1
        },
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
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
    },
    methods: {

      formatterData(row, column) {
        var checkType = "";
        switch (row.consumeType) {
          case 1:
            checkType = "支出";
            break;
          case 2:
            checkType = "收入";
            break;
          case 3:
            checkType = "转账";
            break;
          default:
            checkType = "无";
        }
        return checkType;
      },

      //设置table中的扩展项，展开的id，此处我需要全部展开
      getExpends() {
        var Id = this.list.map(item => item.id)
        this.expends = Id
      },
      getRowKeys(row) {
        return row.id
      },
      getList() {
        this.listLoading = true
        fetchList(this.test1).then(response => {
          this.list = response.data.items
          this.total = 2

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      getAccountList() {
        this.listLoading = true
        accountList(this.accountQuery).then(response1 => {
          this.accountList1 = response1.data
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
      resetTemp() {
        this.temp = {
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
            debugger
            if (this.temp.consumeType == 1) {
              addOneExpand(this.temp).then(() => {
                this.list.unshift(this.temp)
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
