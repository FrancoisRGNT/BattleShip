let socket = io();
let div = document.getElementById('container')





socket.emit('play');


socket.on('start', ()=> {

    let waiting = document.getElementById('waiting');

    waiting.remove();

    let div2 = document.createElement('div');
    div.appendChild(div2);
    div2.addEventListener("click", hit, false);
    div2.classList.add('gameboard');
    let rows = 10;
    let cols = 10;
    let squareSize = 50;

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {

            let square = document.createElement("div");
            div2.appendChild(square);
            square.classList.add('case');
            square.id = 's' + j + i;
            let topPosition = j * squareSize;
            let leftPosition = i * squareSize;
            square.style.top = topPosition + 'px';
            square.style.left = leftPosition + 'px';
        }
    }
    let hitCount = 0;

    let gameBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]



    function hit(event) {
        if (event.target !== event.currentTarget) {
            let row = event.target.id.substring(1, 2);
            let col = event.target.id.substring(2, 3);

            if (gameBoard[row][col] == 0) {
                event.target.style.background = '#bbb';
                gameBoard[row][col] = 3;

            } else if (gameBoard[row][col] == 1) {
                event.target.style.background = 'red';
                gameBoard[row][col] = 2;
                hitCount++;

                if (hitCount == 17) {
                    alert("Tous les bateaux ennemis ont été détruit ! Vous avez gagné !");
                }

            } else if (gameBoard[row][col] > 1) {
                alert("Vous ne pouvez pas tirer 2 fois au même endroit");
            }
        }
        event.stopPropagation();
    }
});

