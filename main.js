const ticTacToe = (function(doc, multiplayerBoolean) {
    let player1 = {
        name: "Player 1",
        icon: "X",
    };

    let player2 = {
        name: "Player 2",
        icon: "O",
    };

    let currentPlayer = player1;
    let multiplayer = multiplayerBoolean;

    let gameBoard = []
    let movementsCount = 0;
    let gameEnded;

    const displayOnDOM = () => {
        gameBoard = [
            ["" , "" , ""],
            ["" , "" , ""],
            ["" , "" , ""],
        ];

        movementsCount = gameBoard.reduce( (accumulator, current) => accumulator + current.length, 0);

        if(confirm("CPU mode?")) {
            multiplayer = false;
            player2.name = "CPU";
        }
        gameEnded = false;
        currentPlayer = player1;

        const DOMtemplate = doc.querySelector(".game-container");
        DOMtemplate.innerHTML = "";
        for(let i = 0; i < gameBoard.length; i++){
            for(let j = 0; j < gameBoard[i].length; j++){

                const tttCell = doc.createElement('div');
                tttCell.classList.add('cell', 'available');
                tttCell.setAttribute('data-row', i);
                tttCell.setAttribute('data-column', j);

                tttCell.addEventListener('click', function handleClick(e) {
                    if(!!e.target.getAttribute('data-choice')) return;
                    
                    if(gameBoard[e.target.getAttribute("data-row")][e.target.getAttribute('data-column')] != "" || gameEnded) return;
                    e.target.setAttribute('data-choice', currentPlayer.icon);
                    e.target.classList.replace('available', 'unavailable'); 
                    gameBoard[e.target.getAttribute("data-row")][e.target.getAttribute('data-column')] = currentPlayer.icon;
                    
                    movementsCount--;

                    if(checkVictory(i, j, currentPlayer)) {
                        alert(`${currentPlayer.name} has won`);
                        gameEnded = true;
                    }

                    if(movementsCount == 0 && !gameEnded) {
                        alert("Tie");
                        displayOnDOM();
                    }

                    if(multiplayer) {
                        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
                    } else {
                        cpuMovement();
                    }

                });

                DOMtemplate.appendChild(tttCell); 
            }
        }
    }

    const checkVictory = (i, j, choice) => {
        if( gameBoard[i].every((current) => current == choice.icon) ) return true;
        if ( gameBoard.every((current) => current[j] == choice.icon)) return true;

        if( gameBoard[0][0] == choice.icon && gameBoard[1][1] == choice.icon && gameBoard[2][2] == choice.icon||
            gameBoard[0][2] == choice.icon && gameBoard[1][1] == choice.icon && gameBoard[2][0] == choice.icon) return true;
        
    }

    const cpuMovement = () => {
        if(gameEnded || movementsCount == 0) return;

        let randomMovement = doc.querySelectorAll(".cell.available");
        randomMovement = randomMovement[Math.floor( Math.random() * randomMovement.length )];
        randomMovement.setAttribute('data-choice', player2.icon);
        randomMovement.classList.replace('available', 'unavailable'); 
        gameBoard[randomMovement.getAttribute("data-row")][randomMovement.getAttribute('data-column')] = player2.icon;
        movementsCount--;
        if(checkVictory(randomMovement.getAttribute('data-row'), randomMovement.getAttribute('data-column'), player2)) {
            alert(`${player2.name} has won`);
            gameEnded = true;
        }
    }


    return {displayOnDOM}

})(document, true);

ticTacToe.displayOnDOM();