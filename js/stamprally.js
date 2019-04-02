let cameraMax = 0;
var cameraNum = 0;
var cameraOn = false;

let scanner = null;

let img = null;

/**
 * 
 * @param {video id} videoId 
 * @param {id of button which is used for switching camera} buttonId 
 */
function initStampRally(videoId, buttonId, imageId){

    img = document.getElementById(imageId);
    img.src = "https://suishosai-server-php.herokuapp.com/createStampCard.php?accessToken=" + getUserID();

    scanner = new Instascan.Scanner(
        {
            video: document.getElementById(videoId),
            scanPeriod: 5,
            mirror: false
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
    if(!getUserID()){
        alert("まずログインしてください");
        return;
    }
    var url = "https://suishosai-server-php.herokuapp.com/redirect2.php";
    var data = createStampRallyRequestUrl(content);
    var callback = function (e) {
        var status = e.target.status;
        var readyState = e.target.readyState;
        var response = e.target.responseText;
        if (status === 200 && readyState === 4) {
            if (response === "No result") {
                alert("翠翔祭スタンプラリーのQRコード以外のQRを読み込みました");
                return;
            }
            else if (response === "already got") {
                alert("もうそのスタンプは押されています");
                return;
            }
            else if (response === "No user") {
                alert("先にログインしてください");
                return;
            } else {
                alert("スタンプを押しました!");
                img.src = "https://suishosai-server-php.herokuapp.com/createStampCard.php?accessToken=" + getUserID()+"&random="+Date.now().toString();
            }
        }
    }
    
    postData(url, data, callback);
}
// Switch Camera
function registerSwitchCameraButton(id){
    document.getElementById(id).addEventListener('click', function(e){
        if(cameraOn){
            cameraNum ++;
            
            if(cameraNum >= cameraMax){
                cameraNum = 0;
            }
            alert(cameraNum);
            alert(cameraMax);
            startWithId(cameraNum);  
        }
    });
}