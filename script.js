let board = document.querySelector(".board");

let boardHeight = board.clientHeight;
let boardWidth = board.clientWidth;

let boxSize = 30;

let rows = Math.floor(boardHeight / boxSize);
let cols = Math.floor(boardWidth / boxSize);

// for(let i = 0; i < rows * cols; i++){
//     let box = document.createElement("div");
//     box.classList.add("box");
//     board.appendChild(box);
// }

for(let row = 0 ;row < rows ;row++){
    for(let col = 0;col < cols ;col++){
    let box = document.createElement("div");
    box.classList.add("box");
    board.appendChild(box);
    }

}