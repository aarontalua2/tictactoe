// GameBoard Module
const GameBoard = (() => {
   
    const board = [];

    const resetBoard = (() => {
            for (i=0; i<9; i++) {
                board[i] = undefined;
        } 
    })();

    const getBoard = () => board;

    const selectSlot = (index, mark) => {
        
        if(board[index] == undefined) {
            board[index] = mark;
            DisplayController.updateBoardDisplay();
        }
    }
    
    return {getBoard, selectSlot}

})();

// Player Factory
const Player = (mark) => {
    const getMark = () => mark;

    return {getMark}
}




// GameController

const GameController = (() => {
    const Player1 = Player('x');
    const Player2 = Player('o');

    let ActivePlayer = Player1;

    let getActivePlayer = () => ActivePlayer;
    const switchActivePlayer = () => {
        ActivePlayer = ActivePlayer === Player1 ? Player2 : Player1
    }

    const checkWin = () => {
        const board = GameBoard.getBoard();
        const allEqual = arr => arr.every(val => (val === arr[0] && val != undefined));

        // Winning combinations
        const hor1 = allEqual(board.slice(0,3));
        const hor2 = allEqual(board.slice(3,6));
        const hor3 = allEqual(board.slice(6,9));
        const ver1 = allEqual([board[0],board[3],board[6]]);
        const ver2 = allEqual([board[1],board[4],board[7]]);
        const ver3 = allEqual([board[2],board[5],board[8]]);
        const diag1 = allEqual([board[0],board[4],board[8]]);
        const diag2 = allEqual([board[2],board[4],board[6]]);
        const winConditions = [hor1, hor2, hor3, ver1, ver2, ver3, diag1, diag2];
        const foundWin = winConditions.includes(true);

        if (foundWin) {
            // Stop game, show winner 
            console.log('winner found')
            DisplayController.removeEventListeners();
        } else {
            console.log('no winners yet')
            switchActivePlayer()
        }

    }

    const playRound = (e) => {
        index = e.target.getAttribute('data-index');
        mark = ActivePlayer.getMark();
        GameBoard.selectSlot(index, mark);

        checkWin();
    }


    return {switchActivePlayer, getActivePlayer, playRound}

})()


// Display Controller
const DisplayController = (() => {
    const gameboard = document.querySelector('.gameboard');


    const updateBoardDisplay = () => {
        gameboard.innerHTML = ``;
        const board = GameBoard.getBoard();
        currentIndex = 0;

        board.forEach(element => {

            const boardItem = document.createElement('button');
            boardItem.classList.add('board-item');
            boardItem.setAttribute('data-index', currentIndex);

            switch(element) {
                case undefined: 
                    break;

                case 'x':
                    boardItem.innerHTML = '<p class="mark">X</p>';
                    break;
                
                case 'o':
                    boardItem.innerHTML = '<p class="mark">O</p>'
                    break;
            }

            gameboard.append(boardItem);
            boardItem.addEventListener('click', GameController.playRound)
            currentIndex++;



        });
    }

    const removeEventListeners = () => {
        const boardItems = document.querySelectorAll('.board-item');
        boardItems.forEach(item => {
            item.removeEventListener('click', GameController.playRound);            
        });
    }
    const showTurn = (player) => {
        // Show current player's turn and mark.
    }

    const showWinner = (player) => {
        // Show winner
    }

    updateBoardDisplay()
    return {updateBoardDisplay, showTurn, showWinner, removeEventListeners}
})();