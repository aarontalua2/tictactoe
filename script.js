// GameBoard Module
const GameBoard = (() => {

    // Creating empty board
    const currentBoard = [];

    // Filling board with 9 empty slots
    for (i=0; i!=9; i++) {
        const BoardSlot = {
            content: undefined
        }
        currentBoard.push(BoardSlot)
    }

    
    const initializeBoard = () => {
        const GameBoard = document.querySelector('.gameboard');
        let initialCount = 0;

        currentBoard.forEach(BoardSlot => {
            newDiv = document.createElement('div');
            newDiv.setAttribute('boardIndex', initialCount);
            GameBoard.append(newDiv);
            initialCount++;
        });       
    };

    
    initializeBoard();

})();

// Player Factory