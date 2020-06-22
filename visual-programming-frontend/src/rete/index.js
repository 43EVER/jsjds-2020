import { NodeEditor, Engine } from 'rete'
import ConnectionPlugin from 'rete-connection-plugin'
import VueRenderPlugin from 'rete-vue-render-plugin'
import AreaPlugin from 'rete-area-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import MinimapPlugin from "rete-minimap-plugin"
import ConnectionReroutePlugin from 'rete-connection-reroute-plugin'

export default async function (container, connOptions = {}, renderOptions = {}) {
    const editor = new NodeEditor('retejs@0.1.0', container);
    
    editor.use(VueRenderPlugin, renderOptions);
    editor.use(MinimapPlugin);
    editor.use(ConnectionPlugin, connOptions);
    editor.use(ContextMenuPlugin, {
        searchBar: true,
        delay: 100,
        allocate(component) {
            return ['System']
        }
    })
    editor.use(ConnectionReroutePlugin);
    
    const engine = new Engine('retejs@0.1.0');
    
    
    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        if(editor.silent) return;
        
        await engine.abort();
        await engine.process(editor.toJSON());
    })

    return {
        editor,
        engine,
        resize() {
            editor.view.resize();
            AreaPlugin.zoomAt(editor);
        },
        process(){ 
            editor.trigger('process');
        }
    }
}