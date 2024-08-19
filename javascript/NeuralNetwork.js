class NeuralNetwork {
    // TODO: add other activation functions
    constructor(inputSize, outputSize) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;

        // Each layer is assigned an element in this array, the number assigned is the size of layer
        this.hiddenLayers = new Array();

        // initializing weights: w[i][j] is the array of weights of the inputs of the j-th neuron in the i-th layer
        // when we are talking about the w multiway array, 0-th layer would be the layer after the input layer.
        this.w = new Array();
        this.w.push(new Array());

        for (let i = 0; i < outputSize; i += 1) {
            this.w[0].push(new Array());
        }
        for (let i = 0; i < outputSize; i += 1) {
            for (let j = 0; j < inputSize; j += 1) {
                this.w[0][i].push(0);
            }
        }

        // initiazing activation values array
        this.a = new Array();
        this.createActivationValuesArray();

    }

    // Creates the activation values matrix according to weight matrix dimensions
    createActivationValuesArray() {
        this.a.splice(0, this.a.length);
        for (let i = 0; i < this.w.length; i += 1) {
            this.a.push(new Array());
        }
        for (let i = 0; i < this.w.length; i += 1) {
            for (let j = 0; j < this.w[i].length; j += 1) {
                this.a[i].push(0);
            }
        }
    }

    // Updates the activation values matrix according to an input
    calculateActivationValues(inputArray) {
        for (let i = 0; i < this.a[0].length; i += 1) {
            this.a[0][i] = this.innerProduct(this.w[0][i], inputArray);
        }
        for (let i = 1; i < this.w.length; i += 1) {
            for (let j = 0; j < this.w[i].length; j += 1) {
                this.a[i][j] = this.relu(this.innerProduct(this.w[i][j], this.a[i - 1]));
            }
        }
    }

    innerProduct(a, b) {
        let ans = 0;
        if (a.length != b.length)
            console.error("Dimensions don't match for inner product. Given arrays have dimensions " + a.length + " and " + b.length + ".");
        else {
            for (let i = 0; i < a.length; i += 1)
                ans += a[i] * b[i];
            return ans;
        }
    }

    // Assigns random weights between 0 and 1
    assignRandomWeights() {
        for (let i = 0; i < this.w.length; i += 1)
            for (let j = 0; j < this.w[i].length; j += 1)
                for (let k = 0; k < this.w[i][j].length; k += 1)
                    this.w[i][j][k] = Math.random();
    }

    relu(x) {
        return Math.max(x, 0);
    }

    addHiddenLayer(layerSize) {
        // Adding a new Layer before the output layer
        this.w.splice(this.w.length - 1, 0, new Array());
        let newLayerIndex = this.w.length - 2
        let outputLayer = this.w[this.w.length - 1];
        let newLayer = this.w[newLayerIndex];


        // initializing weigths for the new layer

        for (let i = 0; i < layerSize; i += 1) {
            newLayer.push(new Array());
        }

        for (let i = 0; i < layerSize; i += 1) {
            let previousLayerSize = this.inputSize;
            if (newLayerIndex > 0)
                previousLayerSize = this.w[newLayerIndex - 1].length;
            for (let j = 0; j < previousLayerSize; j += 1)
                newLayer[i].push(0);
        }

        // Correcting the dimensions and re-initializing weights for the output layer

        outputLayer.splice(0, outputLayer.length);

        for (let i = 0; i < this.outputSize; i += 1) {
            outputLayer.push(new Array());
        }

        for (let i = 0; i < this.outputSize; i += 1) {
            for (let j = 0; j < newLayer.length; j += 1)
                outputLayer[i].push(0);
        }

        // After adding a new Layer, the Activation value array has to be created again with the new dimensions
        this.createActivationValuesArray();

    }

    logNeurons() { // a log message reporting number of neurons in each layer
        console.log("Number of layers (including input and output layer): " + (this.w.length + 1));
        let logMessage = "" + this.inputSize;
        for (let i = 0; i < this.w.length; i += 1) {
            logMessage += " ";
            logMessage += "" + this.w[i].length;
        }
        console.log("Number of neurons in each layer is: " + logMessage);
    }

    logLayer(index) {

        let logMessage = "";
        let neuronCount = index == 0 ? this.inputSize : this.w[index - 1].length;

        if (index > 0)
            for (let i = 0; i < this.w[index - 1].length; i += 1)
                logMessage += " " + this.w[index - 1][i].length;

        if (index > 0)
            console.log("This layer has " + neuronCount + " neurons.\nThe number of neurons in the previous connected to the neurons in this layers is (in order):" + logMessage);
        else
            console.log("This is the first layer with " + this.inputSize + " neurons.");
    }




}