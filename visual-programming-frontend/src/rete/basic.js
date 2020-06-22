import ModulePlugin from 'rete-module-plugin';
import { NumComponent } from './components/num-component';
import { AddComponent } from './components/add-component';
import { MinusComponent } from './components/minus-component'
import { MulComponent } from './components/mul-component';
import { DivComponent } from "./components/div-component";

import { ModuleComponent } from './components/module-component';
import { InputComponent } from './components/input-component';
import { OutputComponent } from './components/output-component';

import init from '../rete'

export default async function(container, modules) {
    const { editor, engine, resize, process } = await init(container);
    editor.use(ModulePlugin, { engine, modules });

    // Math Component
    [
        new NumComponent,
        new AddComponent,
        new MinusComponent,
        new MulComponent,
        new DivComponent,
    ].map(c => {
        editor.register(c)
        engine.register(c)
    });

    // System Component
    [
        new ModuleComponent,
        new InputComponent,
        new OutputComponent
    ].map(c => {
        editor.register(c)
        engine.register(c)
    })

    resize()
    process()

    return { editor, engine, resize, process, modules }
}