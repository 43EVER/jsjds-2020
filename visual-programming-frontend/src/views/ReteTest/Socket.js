import Rete from 'rete';

const anySocket = new Rete.Socket('Any value')

const numSocket = new Rete.Socket('Number value');
const boolSocket = new Rete.Socket('Boolean value');
const arraySocket = new Rete.Socket('Array value');
const stringSocket = new Rete.Socket('String value')

numSocket.combineWith(anySocket)
boolSocket.combineWith(anySocket)
arraySocket.combineWith(anySocket)
stringSocket.combineWith(anySocket)

anySocket.combineWith(numSocket)
anySocket.combineWith(boolSocket)
anySocket.combineWith(arraySocket)
anySocket.combineWith(stringSocket)


export default {
    num: numSocket,
    bool: boolSocket,
    array: arraySocket,
    string: stringSocket,
    any: anySocket
}