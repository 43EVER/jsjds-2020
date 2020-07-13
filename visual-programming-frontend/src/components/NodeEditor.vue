<template>
  <div id="node-editor">
    <el-dialog title="Create Module" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
            <el-form-item label="模块名" label-width="120px" required>
            <el-input v-model="form.modulename"></el-input>
            </el-form-item>
            <el-form-item label="简介" label-width="120px" required>
            <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="分类" label-width="120px" required>
            <el-input v-model="form.path"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog()" type="danger">取 消</el-button>
            <el-button type="primary" @click="handleCreateModule()">确 定</el-button>
        </div>
    </el-dialog>
    <el-drawer
        :with-header="false"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="closeDrawer">
        <el-collapse accordion>
            <el-collapse-item
                style="margin: 1.5rem" 
                v-for="(names, path, index) in modulesPath" :key="index">
                <template slot="title">
                    <div style="font-size: 1.2rem; font-color: #3c3c3c;">{{path}}</div>
                </template>
                <el-row v-for="name in names" :key="name" type="flex" justify="start" style="margin-top: 0.5rem">
                    <el-button
                    @click="loadModule(name)">
                    {{name}}
                    </el-button>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </el-drawer>
    <el-row>
        <el-button @click="saveOrCreateModule" round type="info">
            {{ curModuleName ? '保 存 模 块' : '创 建 模 块' }}
        </el-button>
        <el-button @click="handleOpenDrawer" round type="info">
            查 看 模 块
        </el-button>
    </el-row>
    <div ref="rete" id="rete"></div>
  </div>
</template>

<script>
import init from '../views/ReteTest';
import { mapGetters, mapActions, mapState } from 'vuex'
import { Loading } from 'element-ui';
import ModulePlugin from 'rete-module-plugin'

export default {
    async mounted() {
        await this.initEditor()
        await this.loadModule(this.$route.params.id)
    },
    data() {
        return {
            curModuleName: '',
            editor: null,
            engine: null,
            process: null,
            resize: null,
            form: {},
            loadingInstance: null,
            dialogFormVisible: false,
            drawer: false
        }
    },
    methods: {
        async initEditor() {
            this.modules = JSON.parse(JSON.stringify(this.modulesData))

            if (this.editor) this.editor.destroy();
            if (this.engine) this.engine.destroy();
            this.$refs.rete.innerHTML = '';

            const { editor, engine, resize, process } = 
                await init(this.$refs.rete, this.modules)
            this.resize = resize
            this.process = process
            this.editor = editor
            this.engine = engine
        },
        async saveCurEditor(name) {
            let payload = {
                data: await this.editor.toJSON()
            };
            let id = this.findModuleIDByName(name);
            if (id) payload._id = id
            
            await this.updateModule(payload)
        },


        async loadModule(name) {
            if (this.curModuleName)
                await this.saveCurEditor(this.curModuleName)
            await this.initEditor()
            await this.editor.fromJSON(this.modules[name].data)
            this.curModuleName = name
            this.process();
            this.resize();
        },
        async saveOrCreateModule() {
            if (this.curModuleName) {
                await this.saveCurEditor(this.curModuleName);
            } else {
                // Create Module
                this.form = this.initialData()
                this.openDialog()
            }
        },


        closeDrawer() {
            this.drawer = false
        },
        openDrawer() {
            this.drawer = true
        },
        beginLoading() {
            this.loadingInstance = Loading.service({ fullscreen: true });
        },
        endLoading() {
            if (this.loadingInstance)
                this.loadingInstance.close()
        },
        openDialog() {
            this.dialogFormVisible = true
        },
        closeDialog() {
            this.dialogFormVisible = false
        },
        initialData() {
            return {
                modulename: '',
                description: '',
                path: '',
                data: {id: 'retejs@0.1.0', nodes: {}},
                modules: null
            }
        },
        findModuleIDByName(name) {
            const obj = this.rawModules.find((v) => {
                return v.modulename === name
            });

            if (obj) return obj._id;
            else return null;
        },

        async handleCreateModule() {
            this.beginLoading()

            await this.updateModule(this.form)
            await this.loadModule(this.form.modulename)
            
            this.closeDialog()
            this.endLoading()
        },
        async handleOpenDrawer() {
            this.openDrawer()
        },
        
        ...mapActions(['updateModule', 'fetchModules'])
    },
    computed: {
        ...mapGetters(['modulesData', 'modulesPath']),
        ...mapState(['rawModules']),
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0
}

#node-editor {
    width: 100%;
    height: 100vh;
}

#rete {
    width: 100%;
    height: 100vh;
}
</style>