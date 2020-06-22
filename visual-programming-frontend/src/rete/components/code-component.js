import { Component, Input, Output } from 'rete';
import { CodeControl } from '../controls/field/code';
import Socket from '../sockets';

export class CodeComponent extends Component {
    constructor(CustomFieldControl){
        super("Code")
        this.CustomFieldControl = CustomFieldControl;
    }

    builder(node) {
        var Field = this.CustomFieldControl || CodeControl;
        var inp1 = new Input('param1',"parameter", Socket.any);
        var out = new Output('result', "result", Socket.any);

        return node
            .addControl(new Field(this.editor, 'code', 'any'))
            .addInput(inp1)
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        let code = node.data.code
        eval(code)
    }
}