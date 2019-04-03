let v = null;
var ctx = null;

function read(a) {
    alert(a);
}

function captureToCanvas() {
    if (ctx) {
        try {
            ctx.drawImage(v, 0, 0);
            try {
                qrcode.decode();
            }
            catch (e) {
                console.log(e);
                setTimeout(captureToCanvas, 500);
            };
        }
        catch (e) {
            console.log(e);
            setTimeout(captureToCanvas, 500);
        };
    }
}

function success(stream) {
    v.srcObject = stream;
    v.play();
    initCanvas(v.width, v.height);
    setTimeout(captureToCanvas, 500);
}

function error(error) {
    console.log(error);
}

function isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

function initStampRally(videoId, imageId) {

    if (!isCanvasSupported()) {
        alert("お使いの端末ではご使用になれません");
    }

    if (!getUserID()) {
        var res = confirm("まずログインしてください");
        if (res) {
            login();
        } else {
            location.href = "./";
        }
        return;
    }


    img = document.getElementById(imageId);
    img.src = "https://suishosai-server-php.herokuapp.com/createStampCard.php?accessToken=" + getUserID();

    v = document.getElementById(videoId);
    qrcode.callback = read;

    setwebcam();
}

function initCanvas(w, h){
    var canvas = document.createElement("canvas");
    canvas.id = "qr-canvas";
    canvas.style.visibility = "hidden";
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    document.body.appendChild(canvas);
}

function setwebcam() {

    var options = true;
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
            navigator.mediaDevices.enumerateDevices()
                .then(function (devices) {
                    devices.forEach(function (device) {
                        if (device.kind === 'videoinput') {
                            if (device.label.toLowerCase().search("back") > -1)
                                options = { 'deviceId': { 'exact': device.deviceId }, 'facingMode': 'environment' };
                        }
                    });
                    setwebcam2(options);
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        console.log("no navigator.mediaDevices.enumerateDevices");
        setwebcam2(options);
    }

}

function setwebcam2(options) {
    var n = navigator;

    if (n.mediaDevices.getUserMedia) {
        n.mediaDevices.getUserMedia({ video: options, audio: false }).
            then(function (stream) {
                success(stream);
            }).catch(function (error) {
                error(error)
            });
    }
    else if (n.getUserMedia) {
        n.getUserMedia({ video: options, audio: false }, success, error);
    }
    else if (n.webkitGetUserMedia) {
        n.webkitGetUserMedia({ video: options, audio: false }, success, error);
    }
}

function post(content) {
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
                img.src = "https://suishosai-server-php.herokuapp.com/createStampCard.php?accessToken=" + getUserID() + "&random=" + Date.now().toString();
            }
        }
    }

    postData(url, data, callback);
}