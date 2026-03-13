let board = document.querySelector(".board");
let newgame = document.querySelector(".btn-newgame");
let modal  = document.querySelector(".modal");
let highscoreElement =  document.querySelector(".high-score")
let scoreElement =  document.querySelector(".score")
let timeElement =  document.querySelector(".session-time")


let savedHighScore = localStorage.getItem("HighScrore") || 0;
let score = 0;
let highScore = savedHighScore;
highscoreElement.innerText = highScore;
let sessionTime='00-00';
let boardHeight = board.clientHeight;
let boardWidth = board.clientWidth;

let boxSize = 50;
let direction = "right";

let rows = Math.floor(boardHeight / boxSize);
let cols = Math.floor(boardWidth / boxSize);

let blocks = [];
let snake  = [{x:1,y:3}];
let intervalid = null;
let timeInterval = null;

let food ={x:Math.floor(Math.random()* rows),y:Math.floor(Math.random()* cols)}


// create board
for(let row = 0 ;row < rows ;row++){
    for(let col = 0;col < cols ;col++){

        let box = document.createElement("div");
        box.classList.add("box");
        board.appendChild(box);

        blocks[`${row}-${col}`] = box;
    }
}


// render snake
///
function render(){

    snake.forEach((segment) =>{
        let rendersname = blocks[`${segment.x}-${segment.y}`];

        if(rendersname){
            rendersname.classList.add("snake");
        }
    })
}
///

// render food
let renderfood = blocks[`${food.x}-${food.y}`];

if(renderfood){
    renderfood.classList.add("food");
}


// new game button
newgame.addEventListener("click" , () =>{

    modal.style.display= "none";

    clearInterval(intervalid);

    // remove all old snake blocks
    document.querySelectorAll(".snake").forEach(box=>{
        box.classList.remove("snake");
    });

    snake = [{x:1,y:3}];
    direction = "right";
    timeInterval = setInterval(() => {
        let [m,n] = sessionTime.split("-").map(Number)
        if(n == 59){
            m += 1;
            s = 0;
        }else{
            n = n+1
          
        }
        console.log(m,n)
    }, 1000);
    startGame();


})


// game loop
function startGame(){

    render(); // draw snake first

    intervalid = setInterval(() => {

        let snakeHeade = null;

        if(direction === "left"){
            snakeHeade ={x:snake[0].x,y:snake[0].y-1};

        }else if(direction === "right"){
            snakeHeade ={x:snake[0].x,y:snake[0].y+1};

        }else if(direction === "down"){
            snakeHeade ={x:snake[0].x+1,y:snake[0].y};

        } else if(direction === "up"){
            snakeHeade ={x:snake[0].x-1,y:snake[0].y};
        }


        // wall collision
       // wall collision
if(snakeHeade.x < 0 || snakeHeade.x >= rows || snakeHeade.y < 0 || snakeHeade.y >= cols){

    let before = blocks[`${snake[0].x}-${snake[0].y}`];

    if(before){
        before.classList.remove("snake");
    }

    // alert("game over");
    score = 0;
    scoreElement.innerText = score
    modal.style.display= '';
    clearInterval(intervalid);

    return;
}


        // remove old snake render
        snake.forEach((segment) =>{

            let rendersname = blocks[`${segment.x}-${segment.y}`];

            if(rendersname){
                rendersname.classList.remove("snake");
            }
        })


        snake.unshift(snakeHeade);


        // food collision
        if(snake[0].x === food.x && snake[0].y === food.y){

            blocks[`${food.x}-${food.y}`].classList.remove("food");

            food ={x:Math.floor(Math.random()* rows),y:Math.floor(Math.random()* cols)}

            blocks[`${food.x}-${food.y}`].classList.add("food");
            score+=10;
            scoreElement.innerText = score;
            if(score > highScore){
                highScore = score;
                highscoreElement.innerText=highScore;
                localStorage.setItem('HighScrore',highScore)
            }


        }else{

            snake.pop();
        }


        render();

    }, 400);
}



// controls
addEventListener("keydown",(btnpress) =>{

    if(btnpress.key === "ArrowUp"){
        direction = "up";

    }else if(btnpress.key === "ArrowLeft"){
        direction = "left";

    }else if(btnpress.key === "ArrowRight"){
        direction = "right";

    }else if(btnpress.key === "ArrowDown"){
        direction = "down";
    }

})