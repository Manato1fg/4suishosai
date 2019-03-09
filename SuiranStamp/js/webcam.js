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

    if(navigator.getUserMedia){
        video.srcObject = stream;
        video.play();
    }else if(navigator.webkitGetUserMedia){
        video.srcObject = window.webkitURL.createObjectURL(stream);
        video.play();
    }else if(navigator.mozGetUserMedia){
        video.srcObject = window.URL.createObjectURL(stream);
        video.play();
    };
};