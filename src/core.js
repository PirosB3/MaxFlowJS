"use strict";

var NodeType = {
    SINK: "SINK",
    SOURCE: "SOURCE",
    NODE: "NODE"
}


class Vertex {
    constructor(fromNode, toNode, capacity, flow) {
        this.from = fromNode;
        this.to = toNode;
        this.capacity = capacity;
        this.flow = flow;

        this.bind(this.from, this.to);
    }

    bind(from, to) {
        from.outgoing.push(this);
        to.incoming.push(this);
    }

    getCapacity() {
        return this.capacity;
    }

    getFlow() {
        return this.flow;
    }
}

class Node {
    constructor(name, nodeType) {
        var possibleTypes = new Set(Object.keys(NodeType));
        if (!possibleTypes.has(nodeType)) {
            throw "type is invalid";
        }
        this.nodeType = nodeType;
        this.name = name;
        
        this.outgoing = [];
        this.incoming = [];
    }

    getOutgoingEdges() {
        return this.outgoing;
    }

    getIncomingEdges() {
        return this.incoming;
    }
}

exports.Node = Node;
exports.NodeType = NodeType;
exports.Vertex = Vertex;
