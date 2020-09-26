<template>
  <div>
    <el-button class="filter-item" type="primary" @click="handleDownload"
               v-show="this.classifyQuery.parentId===0"
               style="background: #ffffff;color: #606266">
      {{ $t('刷新') }}
    </el-button>
    <el-button class="filter-item" type="primary" @click="handleCreate" style="background: #4165d7;color: #fff"
               v-show="this.classifyQuery.parentId===0">
      {{ $t('新增') }}
    </el-button>
    <el-button class="filter-item" type="primary" @click="handleDownload" style="background: #fab6b6;color: #fff"
               v-show="this.classifyQuery.parentId===0">
      {{ $t('删除') }}
    </el-button>
    <el-button class="filter-item" type="primary" @click="handleDownload" style="background: #b3e19d;color: #fff"
               v-show="this.classifyQuery.parentId===0">
      {{ $t('转移') }}
    </el-button>
    <el-button class="filter-item" type="primary" @click="handleDownload" style="background: yellow;color: #606266"
               v-show="this.classifyQuery.parentId===0">
      {{ $t('禁用') }}
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
        prop="id"
        label="id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="classifyName"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
                       label="状态"
                       width="120">
        <template scope="scope">
          <span v-if='scope.row.isAvailable===0'>禁用</span>
          <span v-if='scope.row.isAvailable===1'>启用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">转移</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div>
      <el-dialog title="创建新分类" :visible.sync="dialogFormVisible" >
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="reqClassify"
          label-position="left"
          label-width="80px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item label="分类名称" prop="classifyName">
            <el-input v-model="reqClassify.classifyName"/>
          </el-form-item>
          <el-form-item label="父类名称" prop="parentId">
            <el-select
              v-model="reqClassify.parentId"
              placeholder="请选择父类"
              clearable
              style="width: 90px"
              class="filter-item"
              required="true" show-message="请选择"
            >
              <el-option v-for="item in typeOptions" :key="item.key" :label="item.label" :value="item.value"/>
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
import { addClassify } from '@/api/article'

export default {
  name: 'eatable',
  data() {
    return {
      tableData: null,
      classifyQuery: {},
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      reqClassify: {
        parentId: '',
        classifyName: ''
      },
      typeOptions: [{ label: '无', key: '0', value: 0 }],
      rules: {
        classifyName: [
          { required: true, message: '请输入分名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择父类', trigger: 'change' }
        ]
      }

    }
  },
  mounted() {
    Bus.$on('val', (data) => {
      console.log('接收到的数据是' + data.label)
      this.classifyQuery.id = data.id,
        this.classifyQuery.parentId = data.parentId
      if (0 === data.parentId) {
        let temp = {}
        temp.label = data.name,
          temp.key = data.id,
          temp.value = data.id
        this.typeOptions.push(temp)
      }
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
    },
    handleCreate() {
      // this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addClassify(this.reqClassify).then(() => {
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
