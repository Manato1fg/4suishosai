IMAGE_SIZE = 64;
function grayscale(image){
    let dst = new cv.Mat();
    // You can try more different parameters
    cv.cvtColor(image, dst, cv.COLOR_RGBA2GRAY, 0);
    return dst;
}

function resize(image, w, h){
    let dst = new cv.Mat();
    let dsize = new cv.Size(w, h);
    cv.resize(image, dst, dsize, 0, 0, cv.INTER_AREA);
    return dst;
}

function adaptiveThreshold(image){
    let dst = new cv.Mat();
    cv.adaptiveThreshold(image, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
    return dst;
}

function threshold(image, val){
    let dst = new cv.Mat();
    cv.threshold(image, dst, val, 220, cv.THRESH_BINARY);
    return dst;
}

function detectMarkers(image){
    var img = produceAsSameSize(image);
    var markers = [];

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    for (let i = 0; i < contours.size(); ++i) {
        let cnt = contours.get(i);
    }
    //console.log(contours);
    
    /*var magic1 = 4;
    var magic2 = 0.2;
    //search horizontally
    for(var i = 6; i < IMAGE_SIZE / 4; i += 6){
        for(var y = 0; y < IMAGE_SIZE; y+=2){
            for(var x = 0; x < IMAGE_SIZE; x+=2){
                if(x + i >= IMAGE_SIZE || y + i >= IMAGE_SIZE) continue;

                img = roi(image, x, y, i, 1);
                var l = [];
                var last = 100000;
                var current = -1;
                var data = img.data;

                for(var j = 0; j < i; j++){
                    if(last == data[j]){
                        l[current] ++;
                    }else{
                        current ++;
                        l[current] = 1;
                        last = data[j];
                    }
                }

                if(l.length == 3){
                    if(Math.abs(l[1] / l[0] - magic1) < magic2  && Math.abs(l[1] / l[2] - magic1) < magic2){
                        var xx = Math.floor((x + i) / 2);
                        candidates.push(xx * IMAGE_SIZE + y);
                    }
                }

                img = roi(image, x, y, 1, i);
                l = [];
                last = 100000;
                current = -1;
                data = img.data;
                

                for(var j = 0; j < i; j++){
                    if(last == data[j]){
                        l[current] ++;
                    }else{
                        current ++;
                        l[current] = 1;
                        last = data[j];
                    }
                }

                if(l.length == 3){
                    if(Math.abs(l[1] / l[0] - magic1) < magic2  && Math.abs(l[1] / l[2] - magic1) < magic2){
                        var yy = Math.floor((y + i) / 2);
                        if(candidates.indexOf(yy + x * IMAGE_SIZE) >= 1 || candidates.indexOf(yy - 1 + x * IMAGE_SIZE) >= 1 || candidates.indexOf(yy + 1 + x * IMAGE_SIZE) >= 1 || candidates.indexOf(yy + (x-1) * IMAGE_SIZE) >= 1 ||  candidates.indexOf(yy + (x+1) * IMAGE_SIZE) >= 1){
                            markers.push(x + "," + yy);
                        }
                    }
                }
                
            }
        }
    }*/



    return [markers, img];
}

function produceAsSameSize(image){
    let dst = cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC3);
    return dst;
}

function roi(image, x, y, w, h){
    let dst = new cv.Mat();
    let rect = new cv.Rect(x, y, w, h);
    dst = image.roi(rect);
    return dst;
}

function getImage(video){
    
    var canvas = document.createElement('canvas');
    canvas.height = video.height;
    canvas.width = video.width;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}