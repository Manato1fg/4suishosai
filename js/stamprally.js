let cameraMax = 0;
var cameraNum = 0;
var cameraOn = false;

let scanner = null;

/**
 * 
 * @param {video id} videoId 
 * @param {id of button which is used for switching camera} buttonId 
 */
function initStampRally(videoId, buttonId){

    scanner = new Instascan.Scanner(
        {
            video: document.getElementById(videoId),
            scanPeriod: 5
        }
    );
    
    scanner.addListener('scan', post);

    startWithId(0);

    registerSwitchCameraButton(buttonId);
}

function startWithId(cameraId){
    Instascan.Camera.getCameras().then(function (cameras) {
        cameraMax = cameras.length;
        if (cameras.length > 0) {
            scanner.start(cameras[cameraId]);
            cameraOn = true;
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
}

function post(content){
    var url = "https://suishosai-server-php.herokuapp.com/redirect2.php";
    var data = createStampRallyRequestUrl(content);
    
    postData(url, data, function(body){
        if(body === "No result"){
            alert("翠翔祭スタンプラリーのQRコード以外のQRを読み込みました");
            return;
        }
        else if(body === "already got"){
            alert("もうそのスタンプは押されています");
            return;
        }
        else if (body === "No user"){
            alert("先にログインしてください");
            return;
        }else{
            var img = document.createElement("img");
            img.src = "https://suishosai-server-php.herokuapp.com/createStampCard.php?accessToken="+getUserID();
            document.body.appendChild(img);
        }
    })
}
// Switch Camera
function registerSwitchCameraButton(id){
    document.getElementById(id).addEventListener('click', function(e){
        if(cameraOn){
            cameraNum ++;
            if(cameraNum >= cameraMax){
                cameraNum = 0;
            }
            startWithId(cameraNum);  
        }
    });
}