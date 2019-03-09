window.onload = function(){

    //start webcam
    webcam(onSuccessLoading, onError);
}

const detector;

async function onSuccessLoading(stream){
    startWebcam(stream);
    console.log("Loading the model... wait for a moment");
    
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/Manato2cc/4suishosai/master/SuiranStamp/python/model/model.json');
    detector = new AR.Detector();
    const _tf = tf;
    document.getElementById("Loading").remove();
    const video = document.getElementById("video");
    document.getElementById("button").onclick = function(e){
        var imageData = getImage(video);
        var markers = detector.detect(imageData);
        console.log(markers);
        /*var image = _tf.browser.fromPixels(getImage(document.getElementById("video")), 3);
        var axis = 0;
        image = image.expandDims(axis);
        const prediction = model.predict(image).dataSync();
        console.log(prediction);*/
    };
    document.getElementById("button").removeAttribute("disabled");
}

function onError(err){
    alert("正常にカメラが起動できませんでした。\nerror code: "+err.code);
}

function preprocess(video){
}

function getImage(video){
    var canvas = document.createElement('canvas');
    canvas.height = video.height;
    canvas.width = video.width;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
