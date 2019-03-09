window.onload = function(){

    //start webcam
    webcam(onSuccessLoading, onError);
}

async function onSuccessLoading(stream){
    startWebcam(stream);
    console.log("Loading the model... wait for a moment");
    
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/Manato2cc/4suishosai/master/SuiranStamp/python/model/model.json');
    const worker = new Worker("js/worker.js")
    // メッセージを受信してコンソールに表示する
    worker.addEventListener('message', (message) => {
        console.log(JSON.parse(message.data));
    });  
      
    setInterval(function(){
        worker.postMessage(JSON.stringify(getImage(document.getElementById("video"))));
    }, 100);
}

function onError(err){
    alert("正常にカメラが起動できませんでした。\nerror code: "+err.code);
}


function getImage(video){
    var canvas = document.createElement('canvas');
    canvas.height = video.height;
    canvas.width = video.width;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
