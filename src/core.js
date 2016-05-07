"use strict";

var NodeType = {
    SINK: "SINK",
    SOURCE: "SOURCE",
    NODE: "NODE"
}


class Node {
    constructor(nodeType) {
        var possibleTypes = new Set(Object.keys(NodeType));
        if (!possibleTypes.has(nodeType)) {
            throw "type is invalid";
        }
        this.nodeType = nodeType;
    }
}

exports.Node = Node;
exports.NodeType = NodeType;
