<template>
  <div>
    <el-dialog title="编辑Module" :visible.sync="dialogFormVisible">
      <el-form :model="curModule">
        <el-form-item label="模块名" label-width="120px">
          <el-input v-model="curModule.modulename"></el-input>
        </el-form-item>
        <el-form-item label="简介" label-width="120px">
          <el-input v-model="curModule.description"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120px">
          <el-input v-model="curModule.path"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="handleUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <el-button @click="handleCreate">添 加 模 块</el-button>
    <el-table :data="rawModules" style="width: 100%;" v-loading="loading">
        <el-table-column type="expand">
           <template slot-scope="props">
             {{props.row.data}}
           </template>
        </el-table-column>
        <el-table-column
          prop="_id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modulename"
          label="模块名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="简介"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="分类"
          width="180">
        </el-table-column>
        <el-table-column
          label="上传用户"
          width="180">
          <template slot-scope="scope">
            {{scope.row.user ? scope.row.user.name : null}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleEditModule(scope.$index, scope.row)">更改模块</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: 'Modules',
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      curModule: {},
      isEdit: true
    }
  },
  async mounted() {
    this.beginLoading()
    await this.fetchModules()
    this.endLoading()
  },
  methods: {
    ...mapActions([
      'fetchModules',
      'updateModule',
      'deleteModule'
    ]),
    beginLoading() {
      this.loading = true
    },
    endLoading() {
      this.loading = false
    },
    openDialog() {
      this.dialogFormVisible = true
    },
    closeDialog() {
      this.dialogFormVisible = false
    },
    async handleDelete(index, row) {
      this.beginLoading()
      await this.deleteModule({_id: row._id})
      this.endLoading()
    },
    async handleEdit(index, row) {
      this.beginLoading()
      this.openDialog()
      this.curModule = JSON.parse(JSON.stringify(row))
      this.endLoading()
    },
    async handleEditModule(index, row) {
      this.$router.push(`editor/${row.modulename}`)
    },
    async handleUpdate() {
      this.beginLoading()
      await this.updateModule(JSON.parse(JSON.stringify(this.curModule)));
      this.endLoading()
      this.closeDialog()
    },
    async handleCreate() {
      this.beginLoading()
      this.openDialog()
      this.curModule = {
        data: {
          id: "retejs@0.1.0",
          "nodes": 
          { "65": { "id": 65, "data": { "name": "param1" }, "outputs": { "output": { "connections": [] } }, "position": [ -735.2872456085954, -448.8116685821295 ], "name": "Input" } }
        }
      }
      this.endLoading()
    }
  },
  computed: {
    ...mapState([
      'rawModules'
    ])
  }
}
</script>

<style>

</style>

