importScripts("https://unpkg.com/@tensorflow/tfjs");
importScripts("https://unpkg.com/@tensorflow-models/mobilenet");

addEventListener("message", function(e){
    var image = tf.fromPixels(JSON.parse(e.data));
    var axis = 0;
    image = image.expandDims(axis);
    const prediction = model.predict(image);
    self.postMessage(JSON.stringify(prediction));
})
