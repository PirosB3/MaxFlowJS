"use strict";

var NodeType = {
    SINK: "SINK",
    SOURCE: "SOURCE",
    NODE: "NODE"
}

function findAugmentingPath(startNode) {

    // create a queue with 1 element
    var queue = [{
        currentNode: startNode,
        seen: new Set(),
        history: []
    }];

    while (queue.length > 0) {
        var currentObject = queue.shift();

        // if the new node is the destination, return
        if (currentObject.currentNode.nodeType == NodeType.SINK) {
            return currentObject.history;
        }

        // if the new node is already seen, continue
        if (!currentObject.seen.has(currentObject.currentNode)) {

            // copy the seen set and add the current vertex
            var newSeen = new Set(currentObject.seen);
            newSeen.add(currentObject.currentNode);

            // Get all connections from the node
            var connections = currentObject.currentNode.getPossibleCandidates();
            for (var i=0; i < connections.length; i++) {
                var edge = connections[i][2];
                var maxFlow = connections[i][0];

                // get the outgoing node
                var otherNode = edge.getOther(currentObject.currentNode);


                // copy the history and add new item
                var newHistory = currentObject.history.slice();
                newHistory.push([
                    currentObject.currentNode,
                    edge, maxFlow
                ]);

                queue.push({
                    currentNode: edge.getOther(currentObject.currentNode),
                    seen: newSeen,
                    history: newHistory
                });
            }
        }
    }
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

    pushFlowFromVertex(amount, node) {
        if (node == this.from) {
            var newFlow = this.flow + amount;
            if (newFlow > this.capacity) {
                throw "flow too big";
            }
            this.flow = newFlow;
        } else if (node == this.to) {
            var newFlow = this.flow - amount;
            if (newFlow < 0) {
                throw "flow too small";
            }
            this.flow -= amount;
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
exports.findAugmentingPath = findAugmentingPath;
