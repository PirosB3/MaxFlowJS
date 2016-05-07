"use strict";

var NodeType = {
    SINK: "SINK",
    SOURCE: "SOURCE",
    NODE: "NODE"
}

class Edge {
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

    getOther(node) {
        if (node == this.to) {
            return this.from;
        } else if (node == this.from) {
            return this.to;
        } else {
            throw "node of the two nodes are connected";
        }
    }

    getMaxTraverseFromNode(node) {
        if (node == this.from) {
            return this.getCapacity() - this.getFlow();
        } else if (node == this.to) {
            return this.getFlow();
        } else {
            throw "node of the two nodes are connected";
        }
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

    getPossibleCandidates() {
        var results = [];
        var candidates = this.getOutgoingEdges().concat(this.getIncomingEdges());
        for (var i=0; i < candidates.length; i++) {
            var candidate = candidates[i];
            var maximumICanPush = candidate.getMaxTraverseFromNode(this);
            if (maximumICanPush > 0) {
                results.push([
                    maximumICanPush, 
                    candidate.getOther(this).name,
                    candidate
                ]);
            }
        }
        results.sort((a, b) => {
            if (a[1] < b[1]) {
                return -1
            } else if (a[1] > b[1]) {
                return 1;
            } else {
                return 0;
            }
        });

        return results;
    }
}

exports.Node = Node;
exports.NodeType = NodeType;
exports.Edge = Edge;
