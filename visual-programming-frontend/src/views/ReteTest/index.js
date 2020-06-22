import Rete from 'rete';
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import AreaPlugin from 'rete-area-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import ModulePlugin from 'rete-module-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';
import DockPlugin from 'rete-dock-plugin';

import { InputComponent, OutputComponent, ModuleComponent, LogComponent,
            IfComponent, CodeComponent11, CombineComponent } from './components/SystemComponents'
import { AddComponent, MinusComponent, MultiplyComponent, DivComponent,
            ANDComponent, ORComponent, NOTComponent } from './components/MathComponents';
import { NumComponent, BoolComponent, StringComponent } from './components/ValueComponents'


const sys = [
    new InputComponent,
    new OutputComponent,
    new ModuleComponent,
    new LogComponent,
    new IfComponent,
    new CodeComponent11,
    new CombineComponent,
];

const math = [
    new AddComponent,
    new MinusComponent,
    new MultiplyComponent,
    new DivComponent,
    new ANDComponent,
    new ORComponent,
    new NOTComponent,
];

const value = [
    new NumComponent,
    new BoolComponent,
    new StringComponent
]

export default async function (container, dockContainer, modules) {
    const editor = new Rete.NodeEditor('retejs@0.1.0', container);
    const engine = new Rete.Engine('retejs@0.1.0');

    editor.use(ModulePlugin, { engine, modules });
    editor.use(ConnectionPlugin);
    editor.use(ConnectionReroutePlugin);
    editor.use(VueRenderPlugin);
    // editor.use(AreaPlugin);
    editor.use(MinimapPlugin);
    
    [
        sys, math, value
    ].map(c => {
        c.map(cc => {
            editor.register(cc);
            engine.register(cc);
        })
    });
    
    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        if(editor.silent) return;
        
        await engine.abort();
        await engine.process(editor.toJSON());
    });

    editor.use(ContextMenuPlugin, {
        delay: 100,
        allocate(component) {
            if (sys.find((value) => {
                return value.name === component.name;
            })) return ['系统']
            else if (math.find((value) => {
                return value.name === component.name;
            })) return ['数学']
            else return ['值']
        }
    });


    const res = {
        editor,
        engine,
        resize() {
            editor.view.resize()
            AreaPlugin.zoomAt(editor)
        },
        process() {
            editor.trigger('process');
        }
    };

    res.resize();
    res.process();

    return res;
}