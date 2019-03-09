function webcam(callback, error){
    var videoObj = { "video": true };

    // Ask the browser for permission to use the Webcam
    if(navigator.getUserMedia){                    // Standard
        navigator.getUserMedia(videoObj, callback, error);
    }else if(navigator.webkitGetUserMedia){        // WebKit
        navigator.webkitGetUserMedia(videoObj, callback, error);
    }else if(navigator.mozGetUserMedia){        // Firefox
        navigator.mozGetUserMedia(videoObj, callback, error);
    };
}

function startWebcam(stream){

    var video = document.getElementById('video');

    video.width = video.offsetWidth;

    var src;

    if(navigator.getUserMedia)              src = stream;
    else if(navigator.webkitGetUserMedia)   src = window.webkitURL.createObjectURL(stream);
    else if(navigator.mozGetUserMedia)      src = window.URL.createObjectURL(stream);

    if ("srcObject" in video)   video.srcObject = src;
    else                        video.src = src;
    
    video.play();
};