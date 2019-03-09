addEventListener("message", function(e){
    var data = e.data; //Video Element

    var image = tf.browser.fromPixels(getImage(data), 3);  // for example
    var axis = 0;
    image = image.expandDims(axis);
    const prediction = model.predict(image);
    console.log(prediction); 
})

function getImage(video){
    var canvas = document.createElement('canvas');
    canvas.height = video.height;
    canvas.width = video.width;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

