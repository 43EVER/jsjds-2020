import { Component, Output } from 'rete';
import { FieldControl } from '../controls/FileldControl';
import Socket from '../sockets';

export class InputComponent extends Component {

    constructor() {
        super("Input");
        this.module = {
            nodeType: 'input',
            socket: Socket.any
        }
    }

    builder(node) {
        var out1 = new Output('output', "param", Socket.any);
        var ctrl = new FieldControl(this.editor, 'name');

        return node.addControl(ctrl).addOutput(out1);
    }
}