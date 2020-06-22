import Rete from 'rete';
import Socket from '../Socket'
import FieldControl from '../controls/FieldControl'
import CodeControl from '../controls/CodeControl';

export class InputComponent extends Rete.Component {

    constructor() {
        super("Input");
        this.module = {
            nodeType: 'input',
            socket: Socket.any
        }
    }

    builder(node) {
        var out1 = new Rete.Output('output', "value", Socket.any);
        var ctrl = new FieldControl(this.editor, 'name');

        return node.addControl(ctrl).addOutput(out1);
    }
}

export class OutputComponent extends Rete.Component {

    constructor() {
        super("Output");
        this.module = {
            nodeType: 'output',
            socket: Socket.any
        }
    }

    builder(node) {
        var inp = new Rete.Input('input', "value", Socket.any);
        var ctrl = new FieldControl(this.editor, 'name');

        return node.addControl(ctrl).addInput(inp);
    }
}

export class ModuleComponent extends Rete.Component {
    constructor() {
        super("Module");
        this.module = {
            nodeType: 'module'
        }
    }

    builder(node) {
        var ctrl = new FieldControl(this.editor, 'module');
        ctrl.onChange = async () => {
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

export class LogComponent extends Rete.Component {
    constructor(CustomFieldControl) {
        super("Log");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || CodeControl;
        let inp = new Rete.Input('param', "param", Socket.any);

        return node
            .addInput(inp)
            .addControl(new Field(this.editor, 'preview', 'text', true));
    }

    worker(node, inputs, outputs) {

        let n = this.editor.nodes.find(n => n.id == node.id);
        if(n) n.controls.get('preview').setValue(inputs['param'][0]);
    }
}

export class IfComponent extends Rete.Component {
    constructor(CustomFieldControl) {
        super("If");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || FieldControl;
        let inp1 = new Rete.Input('con', "condition", Socket.bool);
        let inp2 = new Rete.Input('param1', "value1", Socket.any);
        let inp3 = new Rete.Input('param2', "value2", Socket.any)
        let outp = new Rete.Output('res', 'result', Socket.any)
        return node
            .addInput(inp1)
            .addInput(inp2)
            .addInput(inp3)
            .addOutput(outp)
    }

    worker(node, inputs, outputs) {
        let con = inputs['con'][0]
        let value1 = inputs['param1'][0]
        let value2 = inputs['param2'][0]

        outputs['res'] = con ? value1 : value2
    }
}

export class CodeComponent11 extends Rete.Component {
    constructor () {
        super("Code");
    }

    builder (node) {
        let codeinp = new Rete.Input('code', "code", Socket.string);
        let inp1 = new Rete.Input('param1', "param1", Socket.any);
        let outp = new Rete.Output('res1', "res1", Socket.any);

        return node
            .addInput(codeinp)
            .addInput(inp1)
            .addOutput(outp)
    }

    worker(node, inputs, outputs) {
        let code = inputs['code'][0];
        eval(code)
    }
}

export class CombineComponent extends Rete.Component {
    constructor () {
        super("Combine");
    }

    builder (node) {
        let inp1 = new Rete.Input('param1', "param1", Socket.any, true);
        let outp = new Rete.Output('res1', "res1", Socket.array);

        return node
            .addInput(inp1)
            .addOutput(outp)
    }

    worker(node, inputs, outputs) {
        outputs['res1'] = inputs['param1']
    }
}