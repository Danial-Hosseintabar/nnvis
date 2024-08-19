class Main {
    static main() {
        // Initialization variables
        Main.SVG = document.getElementById("mainSVG");
        Main.width = 500;
        Main.height = 300;
        Main.drawer = new Draphics(Main.SVG, Main.width, Main.height);
        Main.layerColor = "rgb(234, 234, 234)";
        Main.highlightedLayer = null;
        Main.highlightOpacity = 0.5;

        // Initializing Buttons
        Main.initButtons();

        // Initiazlizing Layers
        new Layer(Main.drawer);

        // EventListeners
        Main.SVG.addEventListener('mousemove', Main.handleMouseMoveSVG);
        Main.SVG.addEventListener('click', Main.handleMouseClickSVG);
        document.getElementById("backgroundDiv").addEventListener('mouseenter', Main.resetLayerHighlights);


        // Initialize a Neural Network
        // Initializing a simple neural network with 1 hidden layer and 2 inputs and 1 outputs
        Main.nn = new NeuralNetwork(2, 1);


    }

    static resetLayerHighlights(event) {

        if (Main.highlightedLayer != null) {
            Main.highlightedLayer.setAttribute("opacity", 0);
            Main.highlightedLayer = null;
        }

    }

    static initButtons() {
        document.getElementById("AddLayerButton").setAttribute("onclick", "Main.addLayer();");
    }

    static handleMouseMoveSVG(event) {
        let x = event.clientX;
        let index = parseInt(x / Main.width * Layer.layers.length);

        if (index == Layer.layers.length) {
            index -= 1;
        }

        if (Main.highlightedLayer != null)
            Main.highlightedLayer.setAttribute("opacity", 0);
        Main.highlightedLayer = Layer.layers[index].getGraphicalNode();
        Main.highlightedLayer.setAttribute("opacity", Main.highlightOpacity);

    }

    static handleMouseClickSVG(event) {
        let x = event.clientX;
        let y = event.clientY;
        Main.drawer.drawRect(x, y, 10, 10, "red", 1);
        console.log(Main.layers);
    }

    static addLayer() {
        console.log("layer added");

        new Layer(Main.drawer);

        for (let i = 0; i < Layer.layers.length; i += 1) {
            Layer.layers[i].getGraphicalNode().setAttribute("width", Main.width / Layer.layers.length);
            Layer.layers[i].getGraphicalNode().setAttribute("x", Main.width / Layer.layers.length * i);
        }
    }
}

window.onload = Main.main;