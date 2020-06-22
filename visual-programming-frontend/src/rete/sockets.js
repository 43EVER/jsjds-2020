import { Socket } from 'rete';

let anyTypeSocket = new Socket('Any Type')

let sockets = {
    num: new Socket('Number value'),
    bool: new Socket('Boolean value'),
    action: new Socket('Action'),
    data: new Socket('Data'),
    package: new Socket('Package'),
    any: anyTypeSocket
}

for (let key in sockets) {
    sockets[key].combineWith(anyTypeSocket)
}

export default sockets