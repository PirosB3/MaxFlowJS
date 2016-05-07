var Node = require('../src/core.js').Node;
var NodeType = require('../src/core.js').NodeType;
var Vertex = require('../src/core.js').Vertex;

describe('Node', () => {
    it('should be able to be a sink', () => {
        var node = new Node('a', NodeType.SINK);
        expect(node.nodeType).toBe(NodeType.SINK);
        expect(node.name).toBe('a');
    });

    it('should raise an exception if its invalid', () => {
        expect(() => {
            new Node("invalid");
        }).toThrow()
    });
});

describe('Vertex', () => {
    it('should be able to have a capacity and a flow', () => {
        var n1 = new Node('a', NodeType.NODE);
        var n2 = new Node('b', NodeType.NODE);
        var vertex = new Vertex(n1, n2, 5, 0);
        expect(vertex.getCapacity()).toBe(5);
        expect(vertex.getFlow()).toBe(0);
    });

    it('should be able to register', () => {
        var n1 = new Node('a', NodeType.NODE);
        var n2 = new Node('b', NodeType.NODE);
        var vertex = new Vertex(n1, n2, 5, 0);

        expect(n1.getOutgoingEdges()).toEqual([vertex]);
        expect(n1.getIncomingEdges()).toEqual([]);
        expect(n2.getOutgoingEdges()).toEqual([]);
        expect(n2.getIncomingEdges()).toEqual([vertex]);
    });
});
