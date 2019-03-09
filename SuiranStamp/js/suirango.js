window.onload = function(){

    //start webcam
    webcam(onSuccessLoading, onError);
}

async function onSuccessLoading(stream){
    startWebcam(stream);
    console.log("Loading the model... wait for a moment");
    
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/Manato2cc/4suishosai/master/SuiranStamp/python/model/model.json');
    const worker = new Worker("./worker.js")
    setInterval(function(){
        worker.postMessage(document.getElementById("video"));
    }, 100);
}

function onError(err){
    alert("正常にカメラが起動できませんでした。\nerror code: "+err.code);
}