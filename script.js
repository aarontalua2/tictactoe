const gameBoard = (() => {

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
        const gameboard = document.querySelector('.gameboard');
        let initialCount = 0;

        currentBoard.forEach(BoardSlot => {
            newDiv = document.createElement('div');
            newDiv.setAttribute('boardIndex', initialCount);
            gameboard.append(newDiv);
            initialCount++;
        });       
    };



    return {initializeBoard, currentBoard}

})();


gameBoard.initializeBoard();