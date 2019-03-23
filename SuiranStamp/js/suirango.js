window.onload = function(){

    //start webcam
    webcam(onSuccessLoading, onError);
}

async function onSuccessLoading(stream){
    startWebcam(stream);
    console.log("Loading the model... wait for a moment");
    
    document.getElementById("button").onclick = function(e){
        const video = document.getElementById("video");
        var imageData = getImage(video);
        let image = cv.matFromImageData(imageData);
        let resized = resize(image, IMAGE_SIZE, IMAGE_SIZE);
        let grayscaled = grayscale(resized);
        let thresholded = adaptiveThreshold(grayscaled);

        var results = detectMarkers(thresholded);
        var markers = results[0];
        var img = results[1];

        cv.imshow('output', img);
    };
    
    console.log(cv);
}

function onError(err){
    alert("正常にカメラが起動できませんでした。\nerror code: "+err.code);
}
