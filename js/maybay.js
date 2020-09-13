var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var snake = {
    x: 20,
    y: canvas.height / 2 - 15,
    dx: 2,
    dy: 2,
    isMoveLeft: false,
    isMoveRight: false,
    isMoveUp: false,
    isMoveDown: false,
    speed: 1,
    size: 30,
};

var treeUp = {
    x: canvas.width - 30,
    y: 0,
    width: 30,
    height: 250,


};

var treeDown = {
    x: canvas.width - 30,
    y: canvas.height,
    width: 30,
    height: 100,

};

var speedTree = 1;
var space = 150;

function drawSnake() {
    context.beginPath();
    context.rect(snake.x, snake.y, snake.size, snake.size);
    context.stroke();
    context.fillStyle = 'red';

    context.fill();
    context.closePath();
}


function moveTrees() {
    treeUp.x -= speedTree;
    treeDown.x -= speedTree;
}

function updatePositionSnake() {
    if (snake.isMoveUp) {
        snake.y -= snake.speed;
    } else snake.y += snake.speed;

}

function handleMoveSnake() {
    document.addEventListener('keyup', function(event) {
        if (event.keyCode == 38) {
            snake.isMoveUp = false;
        }
    });

    document.addEventListener('keydown', function(event) {
        // console.log(event);
        if (event.keyCode == 38) {
            snake.isMoveUp = true;
        }
    });
}
var i = 1;
var score = 0;

// function myLoop() { //  create a loop function
//     setTimeout(function() { //  call a 3s setTimeout when the loop is called
//         console.log('hello'); //  your code here
//         treeUp.height = Math.floor(Math.random() * 200) + 70;
//         // drawTree();
//         i++; //  increment the counter
//         if (i > 0) { //  if the counter < 10, call the loop function
//             treeUp.x = canvas.width - 30;
//             treeUp.y = 0;
//             treeDown.x = canvas.width - 30;
//             treeDown.y = canvas.height;
//             score += 1;
//             console.log(score);
//             document.getElementById("score").innerHTML = score;
//             myLoop(); //  ..  again which will trigger another 
//         } //  ..  setTimeout()
//     }, 1300)
// }


// myLoop();


function drawTree() {
    treeDown.height = 380 - treeUp.height;
    height = treeUp.height;
    context.beginPath();
    context.rect(treeUp.x, treeUp.y, treeUp.width, treeUp.height);
    context.rect(treeDown.x, treeDown.y - treeDown.height, treeDown.width, treeDown.height);
    context.stroke();
    context.fillStyle = 'green';

    context.fill();
    context.closePath();

}
var isGameOver = false;

function handleSnakeVacham() {
    if (snake.y >= canvas.height - 30 ||
        (snake.y <= treeUp.height && snake.x + 30 >= treeUp.x) ||
        (snake.y + 60 >= treeUp.height + 150 && snake.x + 30 >= treeDown.x)) {
        isGameOver = true;
    }
}

function handleGameOver() {
    alert("GAME OVER");

}



function oke() {
    console.log("hihihi");
    var snd = new Audio("js/audios/Me-Cua-No-Thangzet.mp3");
    snd.play();
    snd.currentTime = 0;
}


function play() {


    if (isGameOver) {
        handleGameOver();
    } else {

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawSnake();
        updatePositionSnake();
        requestAnimationFrame(play);
        handleMoveSnake();

        for (let index = 0; index < array.length; index++) {
            const element = array[index];

        }
        // drawTree();
        moveTrees();
        handleSnakeVacham();

    }




}
play();