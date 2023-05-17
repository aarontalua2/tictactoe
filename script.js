// GameBoard Module
const GameBoard = (() => {
	const board = new Array(9).fill(undefined);
	const getBoard = () => board;

	const resetBoard = () => {
		for (i = board.length - 1; i >= 0; i--) {
			board[i] = undefined;
		}
	};

	// Fills boardArray ONLY
	const selectSlot = (index, player) => {
		board[index] = player.getMark();
	};

	return { getBoard, selectSlot, resetBoard };
})();

// Player Factory
const Player = (name, mark) => {
	const getName = () => name;
	const getMark = () => mark;

	return { getName, getMark };
};

// Game Controller -- controls the flow of the game
const GameController = (() => {
	const Player1 = Player("One", "❌");
	const Player2 = Player("Two", "⭕");
	let activePlayer = Player1;

	const getActivePlayer = () => activePlayer;
	const switchActivePlayer = () => {
		activePlayer = activePlayer === Player1 ? Player2 : Player1;
	};

	const checkWin = () => {
		const board = GameBoard.getBoard();
		const allEqual = (arr) =>
			arr.every((val) => val === arr[0] && val != undefined);

		// For checking draw
		const allMarked = board.every((val) => val !== undefined);

		// Winning combinations
		const hor1 = allEqual(board.slice(0, 3));
		const hor2 = allEqual(board.slice(3, 6));
		const hor3 = allEqual(board.slice(6, 9));
		const ver1 = allEqual([board[0], board[3], board[6]]);
		const ver2 = allEqual([board[1], board[4], board[7]]);
		const ver3 = allEqual([board[2], board[5], board[8]]);
		const diag1 = allEqual([board[0], board[4], board[8]]);
		const diag2 = allEqual([board[2], board[4], board[6]]);
		const winConditions = [hor1, hor2, hor3, ver1, ver2, ver3, diag1, diag2];
		const foundWin = winConditions.includes(true);

		// If there's a winner
		if (foundWin) {
			DisplayController.showWinner();
		}

		// If draw
		else if (allMarked) {
			DisplayController.showDraw();
		}

		// No winner and not draw
		else {
			console.log("no winner, not draw");
			switchActivePlayer();
			DisplayController.showTurn();
		}
	};

	const playerMove = (e) => {
		const index = e.target.getAttribute("data-index");
		const board = GameBoard.getBoard();

		if (board[index] == undefined) {
			GameBoard.selectSlot(index, activePlayer);
			DisplayController.addMark(index, activePlayer);
			checkWin();
		}
	};

	const restartGame = () => {
		activePlayer = Player1;
		GameBoard.resetBoard();
		DisplayController.initializeHTML();
	};

	return { getActivePlayer, playerMove, restartGame };
})();

// Display Controller
const DisplayController = (() => {
	const HTMLPlayer = document.querySelector(".player-turn");
	const restartBtns = document.querySelectorAll(".restart");
	const boardArray = GameBoard.getBoard();
	const endround = document.querySelector('.endround');
	const message = document.querySelector('.message')
	let currentIndex = 0;

	const initializeHTML = () => {
		endround.style.display = 'none';
		const HTMLBoard = document.querySelector(".gameboard");
		HTMLBoard.innerHTML = ``;
		boardArray.forEach((item) => {
			const newItem = document.createElement("button");
			newItem.classList.add("board-item");
			newItem.setAttribute("data-index", currentIndex);
			HTMLBoard.append(newItem);
			newItem.addEventListener("click", GameController.playerMove);
			currentIndex++;
		});
		showTurn();
		currentIndex = 0;
	};

	const addMark = (index, player) => {
		const target = document.querySelector(`[data-index="${index}"]`);
		const markText = document.createElement('p');
		markText.classList.add('player-mark');
		markText.textContent = `${player.getMark()}`;
		target.append(markText);
		
	};

	const showTurn = () => {
		const boardItems = document.querySelectorAll(".board-item");
		const activePlayer = GameController.getActivePlayer();
		HTMLPlayer.innerHTML = `<h3>Player ${activePlayer.getName()}'s turn (${activePlayer.getMark()})</h3>`;
		let cursor = undefined;

		if (activePlayer.getMark() == "❌") {
			cursor = `url("assets/X.png"), default`;
		} else {
			cursor = `url("assets/O.png"), default`;
		}

		boardItems.forEach((item) => {
			item.style.cursor = cursor;
		});
	};

	const resetCursor = () => {
		const boardItems = document.querySelectorAll(".board-item");
		boardItems.forEach((item) => {
			item.style.cursor = "pointer";
		});
	};

	const showWinner = () => {
		endround.style.display = 'flex';
		message.innerHTML = `<p>Player ${GameController.getActivePlayer().getName()} won!!</p>`
		removeEventListener();
	};

	const showDraw = () => {
		endround.style.display = 'flex';
		message.innerHTML = `<p>It's a draw!!</p>`
		removeEventListener();
	};

	const removeEventListener = () => {
		const boardItems = document.querySelectorAll(".board-item");
		boardItems.forEach((item) => {
			item.removeEventListener("click", GameController.playerMove);
		});

		resetCursor();
	};

	restartBtns.forEach(button => {
		button.addEventListener("click", GameController.restartGame)
	});

	// First call
	initializeHTML();

	return {
		addMark,
		showTurn,
		showWinner,
		showDraw,
		initializeHTML,
	};
})();
