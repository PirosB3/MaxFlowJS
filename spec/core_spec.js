var Node = require('../src/core.js').Node;
var NodeType = require('../src/core.js').NodeType;

describe('Node', () => {
    it('should be able to be a sink', () => {
        var node = new Node(NodeType.SINK);
        expect(node.nodeType).toBe(NodeType.SINK);
    });

    it('should raise an exception if its invalid', () => {
        expect(() => {
            new Node("invalid");
        }).toThrow()
    });
});
