var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// context.strokeStyle = 'red';

// context.lineTo(0, 0);
// context.lineTo(50, 50);
// context.lineTo(0, 50);
// context.lineTo(0, 0);
// context.stroke();

// // Ham ve hinh chu nhat
// context.rect(50, 50, 100, 50);
// context.stroke();
// context.fillStyle = 'green';
// context.fill();

// Ham ve duong cong
// context.arc(50, 50, 50, 0, Math.PI * 2, true);
// context.fillStyle = 'red';
// context.fill();
// context.stroke();

// context.beginPath();
// context.rect(0, 0, 50, 50);
// context.stroke();
// context.fillStyle = 'red';
// context.fill();
// context.closePath();

// context.beginPath();
// context.moveTo(200, 150);
// context.arc(150, 150, 50, 0, Math.PI * 2);
// context.stroke();
// context.closePath();

// context.beginPath();
// context.arc(300, 300, 50, 0, Math.PI * 2);
// context.stroke();
// context.fill();
// context.closePath();

// var x = 20,
//     y = 20;
// var dx = 5,
//     dy = 2;
// var radius = 20;

var ball = {
    x: canvas.width / 2 - 3,
    y: canvas.height / 2 - 30,
    dx: 3,
    dy: 3,
    radius: 10,
};

var paddle = {
    width: 70,
    height: 10,
    x: canvas.width / 2 - 35,
    y: canvas.height - 10,
    speed: 5,
    isMoveLeft: false,
    isMoveRight: false
};

var isGameOver = false;

var BrickConfig = {
    offsetX: 25,
    offsetY: 25,
    margin: 25,
    width: 35,
    height: 15,
    totalRow: 4,
    totalCol: 8,
};

var BrickList = [];
for (let i = 0; i < BrickConfig.totalRow; i++) {
    for (let j = 0; j < BrickConfig.totalCol; j++) {
        BrickList.push({
            x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.margin),
            y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.margin),
            isBroken: false
        });
    }
}

var isGameOver = false;
var isGameWin = false;
var score = 0;
var maxScore = BrickConfig.totalCol * BrickConfig.totalRow;


document.addEventListener('keyup', function(event) {
    if (event.keyCode == 37) {
        paddle.isMoveLeft = false;
    } else if (event.keyCode == 39) {
        paddle.isMoveRight = false;
    }
});


document.addEventListener('keydown', function(event) {
    console.log(event);
    if (event.keyCode == 37) {
        paddle.isMoveLeft = true;
    } else if (event.keyCode == 39) {
        paddle.isMoveRight = true;
    }
});

function drawBall() {
    // ve qua bong
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

function xuLyVaCham() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius)
        ball.dx = -ball.dx;
    if (ball.y < ball.radius)
        ball.dy = -ball.dy;
}

function handdleBallPaddle() {
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width &&
        ball.y + ball.radius >= canvas.height - paddle.height) {
        ball.dy = -ball.dy;
    }
}

function updatePosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = 'green';
    context.fill();
    context.closePath();

}

// 2 * OFFSET + 5 * WIDTH + 4 * MARGIN = 500
// OFFSET = MARGIN = 25
// => WIDTH : 70
// ROW: 3
// COL:5

function drawBricks() {
    BrickList.forEach(function(b) {
        if (!b.isBroken) {
            context.beginPath();
            context.rect(b.x, b.y, BrickConfig.width, BrickConfig.height);
            context.fillStyle = 'blue';
            context.fill();
            context.closePath();
        }
    });
    // 3 hang 5 cot
    // for (var i = 0; i < 3; i++) {
    //     for (var j = 0; j < 5; j++) {
    //         context.beginPath();
    //         context.rect(25 + j * (70 + 25), 25 + i * (15 + 25), 70, 15);
    //         context.fill();
    //         context.closePath();
    //     }
    // }
}

function updatePaddlePosition() {
    if (paddle.isMoveLeft)
        paddle.x -= paddle.speed;
    else if (paddle.isMoveRight)
        paddle.x += paddle.speed;
    if (paddle.x < 0)
        paddle.x = 0;
    else if (paddle.x > canvas.width - paddle.width)
        paddle.x = canvas.width - paddle.width;
}

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius) {
        isGameOver = true;
    }
}

function handleGameOver() {
    if (isGameWin) {
        alert("You Win");
    } else alert("You Lose");


}

function handleVaChamBallAndBrick() {
    BrickList.forEach(function(b) {
        if (!b.isBroken) {
            if (ball.x >= b.x && ball.x <= b.x + BrickConfig.width &&
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + BrickConfig.height) {
                ball.dy = -ball.dy;
                b.isBroken = true;
                score += 1;
                document.getElementById("score").innerHTML = score;
                if (score >= maxScore) {
                    isGameOver = true;
                    isGameWin = true;
                }
            }
        }
    });
}




function draw() {
    if (!isGameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // ve bong
        drawBall();
        drawBricks();
        drawPaddle();
        updatePaddlePosition();
        xuLyVaCham();
        updatePosition();
        handdleBallPaddle();
        checkGameOver();
        handleVaChamBallAndBrick();
        // ve muot hon
        requestAnimationFrame(draw);
    } else {
        handleGameOver();

    }
}
draw();