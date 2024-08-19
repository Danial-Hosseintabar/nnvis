class Layer {
    static layers = new Array(); // array of all layers
    static backgroundColor = "rgb(234, 234, 234)";

    constructor(drawer) {
        Layer.layers.push(this);
        this.graphicalNode = this.drawShape(drawer);
    }

    drawShape(drawer) {
        let rect = drawer.drawRect(0, 0, drawer.getWidth() / Layer.layers.length, drawer.getHeight(), Layer.backgroundColor, 0);
        let graphicalNode = new GraphicalNode();
        graphicalNode.addChild(rect);
        return graphicalNode;
    }

    getGraphicalNode() {
        return this.graphicalNode;
    }

}