class GraphicalNode {
    constructor(x, y) {
        this.children = new Array();
        this.x = x;
        this.y = y;
    }

    addChild(node) {
        this.children.push(node);
    }

    removeChild(index) {
        this.children.splice(index, 1);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.getY;
    }

    setAttribute(attributeName, value) {
        for (let i = 0; i < this.children.length; i += 1) {
            this.children[i].setAttribute(attributeName, value);
        }
    }

    scale(xScale, yScale) {

    }

}