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
        }else if(text === "Up Side Down"){
            document.getElementById("main").classList.add("reverse");
        }else if(text === "May the Force be with you"){
            document.getElementById("wrapper1").classList.add("starwars-outer");
            document.getElementById("wrapper").classList.add("starwars-inner");
            new Audio('./assets/music/starwars.mp3').play(); // 再生される
            createGyoza();
            setTimeout(doMove, 10);
            alert("OK");
        }
    })
    
    var onMoving = false;
    var vx = 20;
    var vy = -20;
    let img = document.createElement("img");
    
    function createGyoza(){
        img.id = "gyoza-img";
        img.src = "./images/gyoza.jpg";
        document.body.append(img);
        setTimeout(doMove, 10);
    }
    
    function doMove(){
        if(!onMoving) return;
        var x = img.style.x;
        var y = img.style.y;
        var w = img.width;
        var h = img.heightl;
        var W = window.innerWidth;
        var H = window.innerHeight;
        if(x + vx <= 0){
            img.style.x = 0;
            vx = -vx;
        }
        
        if(x + vx + w >= W){
            img.style.x = W - w;
            vx = -vx;
        }
        
        if(y + vy <= 0){
            img.style.y = 0;
            vy = -vy;
        }
        
        if(y + vy + h >= W){
            img.style.y = H - h;
            vy = -vy;
        }
        
        setTimeout(doMove, 10);
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
