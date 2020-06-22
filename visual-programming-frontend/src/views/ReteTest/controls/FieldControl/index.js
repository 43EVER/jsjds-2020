import { Control } from 'rete';
import VueNumControl from './FieldControl.vue';

export default class extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = VueNumControl;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }

    setValue(value) {
        const ctx = this.vueContext || this.props;

        ctx.value = value;
    }

    onChange() {}
}