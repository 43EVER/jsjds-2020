import Rete from 'rete';
import Socket from '../Socket'
import FieldControl from '../controls/FieldControl'
import BoolControl from '../controls/BoolControl'

export class AddComponent extends Rete.Component {
    constructor(CustomFieldControl){
        super("Add");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || FieldControl;
        var inp1 = new Rete.Input('num1',"Number", Socket.num);
        var inp2 = new Rete.Input('num2', "Number", Socket.num);
        var out = new Rete.Output('num', "Number", Socket.num);

        inp1.addControl(new Field(this.editor, 'num1', 'number'))
        inp2.addControl(new Field(this.editor, 'num2', 'number'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new Field(this.editor, 'preview',  'number', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num1'].length?inputs['num1'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 + n2;
        
        var n = this.editor.nodes.find(n => n.id == node.id);
        if(n) n.controls.get('preview').setValue(sum);
        outputs['num'] = sum;
    }
}

export class DivComponent extends Rete.Component {
    constructor(CustomFieldControl){
        super("Div");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || FieldControl;
        var inp1 = new Rete.Input('num1',"Number", Socket.num);
        var inp2 = new Rete.Input('num2', "Number", Socket.num);
        var out = new Rete.Output('num', "Number", Socket.num);

        inp1.addControl(new Field(this.editor, 'num1', 'number'))
        inp2.addControl(new Field(this.editor, 'num2', 'number'))

        // this.engine.process(data, node.id)
        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new Field(this.editor, 'preview',  'number', true))
            .addOutput(out);

    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num1'].length?inputs['num1'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 / n2;
        
        var n = this.editor.nodes.find(n => n.id == node.id);
        if(n) n.controls.get('preview').setValue(sum);
        outputs['num'] = sum;
    }
}

export class MinusComponent extends Rete.Component {
    constructor(CustomFieldControl){
        super("Minus");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || FieldControl;
        var inp1 = new Rete.Input('num1',"Number", Socket.num);
        var inp2 = new Rete.Input('num2', "Number", Socket.num);
        var out = new Rete.Output('num', "Number", Socket.num);

        inp1.addControl(new Field(this.editor, 'num1', 'number'))
        inp2.addControl(new Field(this.editor, 'num2', 'number'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new Field(this.editor, 'preview',  'number', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num1'].length?inputs['num1'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 - n2;
        
        var n = this.editor.nodes.find(n => n.id == node.id);
        if(n) n.controls.get('preview').setValue(sum);
        outputs['num'] = sum;
    }
}

export class MultiplyComponent extends Rete.Component {
    constructor(CustomFieldControl){
        super("Multiply");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || FieldControl;
        var inp1 = new Rete.Input('num1',"Number", Socket.num);
        var inp2 = new Rete.Input('num2', "Number", Socket.num);
        var out = new Rete.Output('num', "Number", Socket.num);

        inp1.addControl(new Field(this.editor, 'num1', 'number'))
        inp2.addControl(new Field(this.editor, 'num2', 'number'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new Field(this.editor, 'preview',  'number', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num1'].length?inputs['num1'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 * n2;
        
        var n = this.editor.nodes.find(n => n.id == node.id);
        if(n) n.controls.get('preview').setValue(sum);
        outputs['num'] = sum;
    }
}

export class ANDComponent extends Rete.Component {
    constructor(CustomFieldControl){
        super("AND");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        let Field = this.CustomFieldControl || BoolControl;
        let inp1 = new Rete.Input('param1',"Boolean", Socket.bool);
        let inp2 = new Rete.Input('param2', "Boolean", Socket.bool);
        var out = new Rete.Output('result', "Boolean", Socket.bool);

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        let n1 = inputs['param1'][0];
        let n2 = inputs['param2'][0];
        let res = n1 & n2;
        
        outputs['result'] = res;
    }
}

export class ORComponent extends Rete.Component {
    constructor(CustomFieldControl){
        super("OR");
        this.CustomFieldControl = CustomFieldControl;
        
    }

    builder(node) {
        let inp1 = new Rete.Input('param1',"Boolean", Socket.bool);
        let inp2 = new Rete.Input('param2', "Boolean", Socket.bool);
        var out = new Rete.Output('result', "Boolean", Socket.bool);
        
        return node
            .addInput(inp1)
            .addInput(inp2)
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        let n1 = inputs['param1'][0];
        let n2 = inputs['param2'][0];
        let res = n1 | n2;
        
        outputs['result'] = res;
    }
}

export class NOTComponent extends Rete.Component {
    constructor(CustomFieldControl){
        super("NOT");
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        let inp1 = new Rete.Input('param1',"Boolean", Socket.bool);
        var out = new Rete.Output('result', "Boolean", Socket.bool);
        let Field = this.CustomFieldControl || BoolControl;
        
        return node
            .addInput(inp1)
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        let n1 = inputs['param1'][0];
        let res = !n1;
        
        outputs['result'] = res;
    }
}