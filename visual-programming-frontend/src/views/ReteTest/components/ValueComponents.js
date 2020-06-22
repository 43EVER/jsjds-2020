import Rete from 'rete';
import Socket from '../Socket'
import FieldControl from '../controls/FieldControl'
import BoolControl from '../controls/BoolControl'
import CodeControl from '../controls/CodeControl'

export class NumComponent extends Rete.Component {

    constructor(CustomFieldControl) {
        super("Number");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || FieldControl;
        var out1 = new Rete.Output('num', "Number", Socket.num);

        return node.addControl(new Field(this.editor, 'num', 'number')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

export class BoolComponent extends Rete.Component {

    constructor(CustomFieldControl) {
        super("Boolean");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || BoolControl;
        var out1 = new Rete.Output('res', "Bool", Socket.bool);

        return node.addControl(new Field(this.editor, 'res')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        // console.log(`value: ${node.data.res}`)
        outputs['res'] = node.data.res;
    }
}

export class StringComponent extends Rete.Component {

    constructor() {
        super("String");
    }

    builder(node) {
        var Field = CodeControl;
        var out1 = new Rete.Output('res', "String", Socket.string);

        return node
                .addControl(new Field(this.editor, 'res'))
                .addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['res'] = node.data.res;
    }
}