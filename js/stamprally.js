let videoId = "";

function read(a) {
    alert(a);
}

function success(stream) {
    v.srcObject = stream;
    v.play();
}

function error(error) {
    console.log(error);
}

function initStampRally(v, i) {

    if (!getUserID()) {
        var res = confirm("まずログインしてください");
        if (res) {
            login();
        } else {
            location.href = "./";
        }
    }


    img = document.getElementById(i);
    img.src = "https://suishosai-server-php.herokuapp.com/createStampCard.php?accessToken=" + getUserID();

    videoId = v;
    qrcode.callback = read;

    setwebcam();
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
    v = document.getElementById(videoId);

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