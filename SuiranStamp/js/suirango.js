window.onload = function(){

    //start webcam
    webcam(onSuccessLoading, onError);
}

async function onSuccessLoading(stream){
    startWebcam(stream);
    const model = await tf.loadLayersModel('http://mnt2cc.com/suiiranStamp/model/suirango.json');
    setInterval(function(){
        var thread = new Thread(function(video){
            var image = tf.fromPixels(video);  // for example
            const prediction = model.predict(image);
            console.log(prediction); 
        })

        thread.once(document.getElementById("video"));
        
    }, 100);
}

function onError(err){
    alert("正常にカメラが起動できませんでした。\nerror code: "+err.code);
}