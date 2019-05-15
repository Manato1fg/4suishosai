window.onload = function(){
    var rythm = new Rythm();
    rythm.setMusic('./assets/music/gyoza.mp3');
    registerRythm();

    var onStart = function () {
        if (rythm.stopped === false) {
            rythm.stop()
        }
        rythm.start();
    }

    appendConciergeCallback(function(text){
        if(text === "The secret key was given"){
            onStart();
            createGyoza();
            onMoving = true;
            setTimeout(doMove, t);
            alert("OK");
        }else if(text === "Up Side Down"){
            document.getElementById("main").classList.add("reverse");
        }else if(text === "May the Force be with you"){
            document.getElementById("wrapper1").classList.add("starwars-outer");
            document.getElementById("wrapper").classList.add("starwars-inner");
            new Audio('./assets/music/starwars.mp3').play(); // 再生される
            
        }
    })
    
    var onMoving = false;
    var vx = 2;
    var vy = -2;
    var _x = 0;
    var _y = 0;
    var w = 200;
    var h = 160;
    var t = 5;
    let img = document.createElement("img");
    
    function createGyoza(){
        img.id = "gyoza-img";
        img.src = "./images/gyoza.png";
        img.style.top = 0;
        document.body.append(img);
        setTimeout(doMove, 10);
    }
    
    function doMove(){
        if(!onMoving) return;
        
        var W = window.innerWidth;
        var H = window.innerHeight;
        
        _x += vx;
        _y += vy;
        if(_x <= 0){
            _x = 0;
            vx = -vx;
        }
        
        if(_x +  w >= W){
            _x = W - w;
            vx = -vx;
        }
        
        if(_y <= 0){
            _y = 0;
            vy = -vy;
        }
        
        if(_y + h >= H){
            _y = H - h;
            vy = -vy;
        }
        img.style.left = _x + "px";
        img.style.top = _y + "px";
        
        setTimeout(doMove, t);
    }
           
    function registerRythm(){
        rythm.addRythm("pulse", "pulse", 150, 10);
        rythm.addRythm('neon1', 'neon', 0, 10, {
            from: [0, 0, 255],
            to: [255, 0, 255]
        })
        rythm.addRythm('neon2', 'neon', 0, 10, {
            from: [255, 255, 0],
            to: [255, 0, 0]
        })
        rythm.addRythm('blur', 'blur', 0, 10, {
            reverse: true
        })
        rythm.addRythm('color1', 'color', 0, 10, {
            from: [0, 0, 255],
            to: [255, 0, 255]
        })
        rythm.addRythm('borderWidth', 'borderWidth', 0, 2, {
            min: 2,
            max: 10
        })

        rythm.addRythm('borderColor2', 'borderColor', 0, 10, {
            from: [0, 0, 255],
            to: [255, 0, 255]
        })
        rythm.addRythm('kern1', 'kern', 0, 10, {
            min: -5,
            max: 5
        })
        rythm.addRythm('swing', 'swing', 0, 10, {
            curve: 'up',
        })
        rythm.addRythm('jump', 'jump', 0, 10);

        rythm.addRythm('shake', 'shake', 0, 10);
        rythm.addRythm('vanish1', 'vanish', 0, 10)
        rythm.addRythm('vanish2', 'vanish', 0, 10, {
            reverse: true
        })
    }
}
