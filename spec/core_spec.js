var Node = require('../src/core.js').Node;
var NodeType = require('../src/core.js').NodeType;
var Edge = require('../src/core.js').Edge;

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

    it('should be able to get candidates to traverse', () => {
        var tl = new Node('a', NodeType.NODE);
        var bl = new Node('b', NodeType.NODE);
        var tr = new Node('c', NodeType.NODE);
        var br = new Node('d', NodeType.NODE);
        var c = new Node('center', NodeType.NODE);

        var e1 = new Edge(tl, c, 5, 2);
        var e2 = new Edge(bl, c, 5, 0);
        var e3 = new Edge(c, tr, 5, 0);
        var e4 = new Edge(c, br, 5, 5);

        expect(c.getPossibleCandidates()).toEqual([
            [2, 'a', e1],
            [5, 'c', e3]
        ]);
    });
});

describe('Edge', () => {
    it('should be able to have a capacity and a flow', () => {
        var n1 = new Node('a', NodeType.NODE);
        var n2 = new Node('b', NodeType.NODE);
        var edge = new Edge(n1, n2, 5, 0);
        expect(edge.getCapacity()).toBe(5);
        expect(edge.getFlow()).toBe(0);
    });

    it('should be able to register', () => {
        var n1 = new Node('a', NodeType.NODE);
        var n2 = new Node('b', NodeType.NODE);
        var edge = new Edge(n1, n2, 5, 0);

        expect(n1.getOutgoingEdges()).toEqual([edge]);
        expect(n1.getIncomingEdges()).toEqual([]);
        expect(n2.getOutgoingEdges()).toEqual([]);
        expect(n2.getIncomingEdges()).toEqual([edge]);
    });

    it('should be able to get maximum amount to traverse', () => {
        var n1 = new Node('a', NodeType.NODE);
        var n2 = new Node('b', NodeType.NODE);

        var edge = new Edge(n1, n2, 5, 3);
        expect(edge.getMaxTraverseFromNode(n1)).toEqual(2);
        expect(edge.getMaxTraverseFromNode(n2)).toEqual(3);

        edge = new Edge(n1, n2, 5, 5);
        expect(edge.getMaxTraverseFromNode(n1)).toEqual(0);
        expect(edge.getMaxTraverseFromNode(n2)).toEqual(5);

        edge = new Edge(n1, n2, 5, 0);
        expect(edge.getMaxTraverseFromNode(n1)).toEqual(5);
        expect(edge.getMaxTraverseFromNode(n2)).toEqual(0);
    });
});
