import { Component } from 'rete';
import { FieldControl } from '../controls/FileldControl';


export class ModuleComponent extends Component {

    constructor() {
        super("Module");
        this.module = {
            nodeType: 'module'
        }
    }

    builder(node) {
        var ctrl = new FieldControl(this.editor, 'module');
        ctrl.onChange = async function() {
            this.updateModuleSockets(node);
            await node.update();
        }
        return node.addControl(ctrl);
    }

    change(node, item) {
        node.data.module = item;
        this.editor.trigger('process');
    }
}