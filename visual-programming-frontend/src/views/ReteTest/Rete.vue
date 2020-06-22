<template>
    <div class="container">
<!--         
        <el-row v-for="rawModule in rawModulesLocal" :key="rawModule.modulename">
            <el-button @click="loadModule(rawModule.modulename)">{{rawModule.modulename}}</el-button>
        </el-row> -->
        <el-row>
            <el-col :span="6">
                <el-select v-model="tmp.tmpModuleName" placeholder="请选择"
                            @change="loadModule">
                    <el-option
                    v-for="name in rawModulesLocal" 
                    :key="name"
                    :value="name">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-button @click="saveModule">保 存 模 块</el-button>
            </el-col>
            <el-col :span="3">
                <el-input v-model="tmp.tmpInputModuleName"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button @click="createModule(tmp.tmpInputModuleName)">创建模块</el-button>
            </el-col>
        </el-row>
        <div class="editor">
            <div class="container">
                <div ref="rete" class="rete"></div>
            </div>
            <div ref="dock" class="dock"></div>
        </div>
    </div>
</template>

<style>
.rete {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    height: 100vh;
}

.dock {
    height: 100px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
}

.dock-item {
    display: inline-block;
    vertical-align: top;
    transform: scale(0.8);
    transform-origin: 50% 0;
}

.container {
    flex: 1;
    overflow: hidden;
}
</style>

<script>
import init from './index'
import { mapGetters, mapState, mapActions } from 'vuex'

import mm from './modules.json'
import mm2 from './name.json'

export default {
    async mounted() {
        this.modules = mm
        this.rawModulesLocal = mm2
        await this.initEditor();
    },
    methods: {
        async loadModule(name) {
            // console.log(name)
            if (this.curModuleName)
                await this.saveCurEditor(this.curModuleName)
            await this.initEditor(name)
            this.process();
            this.resize();
            this.curModuleName = name;
        },
        async saveCurEditor(name) {
            this.modules[name].data = await this.editor.toJSON();
        },
        async initEditor(name) {
            if (this.editor) this.editor.destroy();
            if (this.engine) this.engine.destroy();
            this.$refs.rete.innerHTML = '';

            const { editor, engine, resize, process } = 
                await init(this.$refs.rete, this.$refs.dock, this.modules);
            this.editor = editor;
            this.process = process;
            this.resize = resize;
            this.engine = engine;

            if (name)
                await this.editor.fromJSON(this.modules[name].data);
        },
        async createModule(name) {
            this.modules[name] = {
                data: {
                    id: 'retejs@0.1.0', 
                    nodes: {}
                }
            };
            this.rawModulesLocal.push(name);
            // console.log(this.rawModulesLocal)
            await this.loadModule(moduleName);
        },
        async saveModule() {
            if (this.curModuleName)
                await this.saveCurEditor(this.curModuleName)
            await this.saveModulesObj(this.modules)
        },
        ...mapActions(['saveModulesObj'])
    },
    data() {
        return {
            modules: {
                "sort":{"data":{"id":"retejs@0.1.0","nodes":{"43":{"id":43,"data":{"name":"arr"},"inputs":{},"outputs":{"output":{"connections":[{"node":53,"input":"param1","data":{"pins":[]}}]}},"position":[-410.078125,-266.5],"name":"Input"},"44":{"id":44,"data":{"name":"arr2"},"inputs":{"input":{"connections":[{"node":53,"output":"res1","data":{"pins":[]}}]}},"outputs":{},"position":[305.921875,-278.5],"name":"Output"},"53":{"id":53,"data":{},"inputs":{"code":{"connections":[{"node":54,"output":"res","data":{"pins":[]}}]},"param1":{"connections":[{"node":43,"output":"output","data":{"pins":[]}}]}},"outputs":{"res1":{"connections":[{"node":44,"input":"input","data":{"pins":[]}}]}},"position":[-5.15625,-339],"name":"Code"},"54":{"id":54,"data":{"res":"let arr = inputs['param1'][0]\noutputs['res1'] = arr.sort((a, b) => {\nreturn Number(a) - Number(b)\n})"},"inputs":{},"outputs":{"res":{"connections":[{"node":53,"input":"code","data":{"pins":[]}}]}},"position":[-369.15625,-674],"name":"String"}}}},"test":{"data":{"id":"retejs@0.1.0","nodes":{"45":{"id":45,"data":{"num":100},"inputs":{},"outputs":{"num":{"connections":[{"node":47,"input":"param1","data":{"pins":[]}}]}},"position":[-504.29353329270276,-400.35041583753195],"name":"Number"},"46":{"id":46,"data":{"num":123},"inputs":{},"outputs":{"num":{"connections":[{"node":47,"input":"param1","data":{"pins":[]}}]}},"position":[-497.8791727398559,-263.1402462441087],"name":"Number"},"47":{"id":47,"data":{},"inputs":{"param1":{"connections":[{"node":45,"output":"num","data":{"pins":[]}},{"node":46,"output":"num","data":{"pins":[]}},{"node":60,"output":"num","data":{"pins":[]}}]}},"outputs":{"res1":{"connections":[{"node":49,"input":"arr","data":{"pins":[]}}]}},"position":[-90.078125,-120.5],"name":"Combine"},"49":{"id":49,"data":{"module":"sort"},"inputs":{"arr":{"connections":[{"node":47,"output":"res1","data":{"pins":[]}}]}},"outputs":{"arr2":{"connections":[{"node":50,"input":"param","data":{"pins":[]}}]}},"position":[223.06547780311882,-184.35639719688118],"name":"Module"},"50":{"id":50,"data":{},"inputs":{"param":{"connections":[{"node":49,"output":"arr2","data":{"pins":[]}}]}},"outputs":{},"position":[593.6612024359221,-321.07913041615336],"name":"Log"},"60":{"id":60,"data":{"num":6},"inputs":{},"outputs":{"num":{"connections":[{"node":47,"input":"param1","data":{"pins":[]}}]}},"position":[-487.5837807769481,-39.62364238541057],"name":"Number"}}}}},
            curModuleName: '',
            editor: null,
            engine: null,
            process: null,
            resize: null,
            tmp: {
                tmpModuleName: '',
                tmpInputModuleName: ''
            },
            rawModulesLocal: [],
        }
    },
    computed: {
        ...mapGetters(['modulesData']),
        ...mapState(['rawModules'])
    },
    
}
</script>