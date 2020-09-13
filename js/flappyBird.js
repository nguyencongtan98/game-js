var canvas = document.getElementById("game");
var context = canvas.getContext('2d');

var Bird = {
    x: 50,
    y: 50,
    width: 40,
    height: 40,
    isMove: false
};

var pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 70
};

var khoangCach = 100;
var speedPipe = 2;
var constant;
var score = 0;

var bird = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var bg = new Image();

bird.src = "images/bird.png";
pipeUp.src = "images/pipe.png";
pipeDown.src = "images/pipe.png";
bg.src = "images/bg.png";

document.addEventListener("keydown", function(event) {
    if (event.isTrusted)
        Bird.isMove = true;
});

document.addEventListener("keyup", function(event) {
    if (event.isTrusted)
        Bird.isMove = false;
});

function moveBird(event) {
    if (Bird.isMove) {
        Bird.y -= 2;
    } else Bird.y += 2;
}

var check = 0;

context.drawImage(bird, Bird.x, Bird.y);

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    pipeUp.width = 40;
    pipeUp.height = 200;

    for (let i = 0; i < pipe.length; i++) {
        // console.log(i);
        context.beginPath();

        context.drawImage(pipeUp, pipe[i].x, 0, pipeUp.width, pipe[i].y);
        context.drawImage(pipeDown, pipe[i].x, pipe[i].y + khoangCach, pipeUp.width, canvas.height - khoangCach - pipe[i].y);

        pipe[i].x -= speedPipe;
        console.log(speedPipe);
        if (pipe[i].x == 30) {
            score++;
        }

        if (pipe[i].x == 200) {
            check++;
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * 200) + 70
            });
            check++;
        }

        if (check % 2 == 0) {
            context.fillStyle = 'green';

        }


        if (Bird.y + Bird.height >= canvas.height ||
            (Bird.x + Bird.x - 15 >= pipe[i].x && Bird.x < pipe[i].x + pipeUp.width && Bird.y + Bird.height >= pipe[i].y + khoangCach) ||
            Bird.x + Bird.x - 15 >= pipe[i].x && Bird.x < pipe[i].x + pipeUp.width && Bird.y <= pipe[i].y) {
            alert("GameOVer");
        }
        context.closePath();

    }


    pipeUp.x--;

    context.fillText("Score: " + score, 50, 50);

    context.drawImage(bird, Bird.x, Bird.y, Bird.width, Bird.height);
    context.font = '20px sans-serif';
    context.fillStyle = 'blue';


    moveBird();
    // Bird.y += 1.5;
    requestAnimationFrame(draw);

}

draw();