<template>
  <div>
    <span style="font-size: 12px">余额:</span>&nbsp;<span style="color: red;font-size: 22px">{{ this.totalBalance }}</span>
    <el-button v-show="this.reqAccount.parentAccountId===0" class="filter-item" style="background: #4165d7;color: #fff" type="primary"
               @click="handleCreate">
      {{ $t('新增') }}
    </el-button>
    <div style="margin-top: 20px"></div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">

      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="id"
        prop="id"
        width="120">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="accountName"
        width="140">
      </el-table-column>
      <el-table-column
        label="余额"
        prop="balance"
        width="160">
      </el-table-column>
      <el-table-column
                       label="状态"
                       width="100">
        <template scope="scope">
          <span v-if='scope.row.isAvailable===0'>禁用</span>
          <span v-if='scope.row.isAvailable===1'>启用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleClick(scope.row)">转移</el-button>
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text" @click="handleClick(scope.row)">删除</el-button>
          <el-button size="small" type="text" @click="handleClick(scope.row)">禁用</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div>
      <el-dialog :visible.sync="dialogFormVisible" title="创建新账户" >
        <el-form
          ref="dataForm"
          :model="reqAccount"
          :rules="rules"
          label-position="left"
          label-width="80px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item label="账户名称" prop="accountName">
            <el-input v-model="reqAccount.accountName"  style="width: 300px"/>
          </el-form-item>
          <el-form-item label="父类名称" prop="parentId" style="width: 300px">
            <el-select
              v-model="reqAccount.parentAccountId"
              clearable
              @change="handleChange()"
              placeholder="请选择父类"
              required="true" show-message="请选择"
              style="width: 150px"
            >
              <el-option v-for="item in typeOptions" :key="item.key" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="账户类型" prop="accountType" style="width: 300px">
            <el-select
              v-model="reqAccount.accountType"
              clearable
              placeholder="请选择类型"
              required="true"
              show-message="请选择" style="width: 150px"
            >
              <el-option v-for="item in accountType" :key="item.key" :label="item.label" :value="item.value"/>
            </el-select>
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
    </div>
  </div>

</template>

<script>
import Bus from './bus.js'
import { addOneExpand, addOneIncome, getClassifyByIdOrParentId, tranferAccount } from '../../../api/article'
import { addClassify, getAccountByIdOrParentId } from '@/api/article'

export default {
  name: 'accountEatable',
  data() {
    return {
      tableData: null,
      reqAccount: {},
      totalBalance:'',
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      accountType:[],
      typeOptions: [{ label: '无', key: '0', value: 0 }],
      rules: {
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        parentAccountId: [
          { required: true, message: '请选择父类', trigger: 'change' }
        ]
      }

    }
  },
  mounted() {
    Bus.$on('val', (data) => {
      console.log('接收到的数据是' + data.label)
      this.reqAccount.id = data.id,
      this.reqAccount.parentAccountId = data.parentId
      this.totalBalance=data.totalBalance
      if (0 === data.parentId) {
        let temp = {}
        temp.label = data.name,
          temp.key = data.id,
          temp.value = data.id
        this.typeOptions.push(temp)
      }
      this.getAccountByIdOrParentId()
    })
  },
  methods: {
    getAccountByIdOrParentId() {
      this.listLoading = true
      getAccountByIdOrParentId(this.reqAccount).then(response1 => {
        this.tableData = response1.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleCreate() {
      // this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleChange() {
      this.$forceUpdate()
      // this.resetTemp()
      if(this.reqAccount.parentAccountId===0){
        let temp = {}
        let temp1 = {}
        temp.label = '普通账户',
          temp.key = 1,
          temp.value = 1
        this.accountType.push(temp)
        temp1.label = '负债账户',
          temp1.key = 2,
          temp1.value = 2
        this.accountType.push(temp1)
      }

    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addClassify(this.reqAccount).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            location.reload()
          })

        }
      })
    }

  }
}
</script>
