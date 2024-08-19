// A class for drawing nodes on a svg element.
// Each node is added into an array called "nodes" and has a unique index (its index within the array)

class Draphics {
    constructor(SVGElement, width, height) {
        this.nodes = new Array();
        this.win = SVGElement;
        this.width = width;
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getShapes() {
        return this.nodes;
    }
    // TODO: test this
    eraseShape(index) {
        if (index < 0 || index >= this.nodes.length) {
            console.error("Shape index is out of bounds; Chosen index is " + index + " while nodes array's length is " + this.nodes.length)
        }
    }

    drawRect(x, y, width, height, color, opacity) {
        let newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); // document.createElement("rect");
        newRect.setAttribute("id", "Draphics" + this.nodes.length);
        this.nodes.push(newRect);
        newRect.setAttribute("x", x);
        newRect.setAttribute("y", y);
        newRect.setAttribute("width", width);
        newRect.setAttribute("height", height);
        newRect.setAttribute("fill", color);
        newRect.setAttribute("opacity", opacity);
        this.win.appendChild(newRect);
        return newRect;
    }


}