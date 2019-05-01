window.onload = function(){
    var rythm = new Rythm();
    rythm.setMusic('./assets/music/gyoza.mp3');
    registerRythm();

    appendConciergeCallback(function(text){
        if(text === "The secret key was given"){
            onStart();
        }
    })

    var onStart = function(){
        if (rythm.stopped === false) {
            rythm.stop()
        }
        rythm.start();
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