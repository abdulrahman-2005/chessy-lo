let alerter = document.getElementById("alert");
let board;
let PlayerTurn = "w";
let moves = [];

function switchPlayer(currentPlayer) {
	if (currentPlayer === "w") {
		PlayerTurn = "b";
	} else {
		PlayerTurn = "w";
	}
}

let piecee;
function remixBoard(board) {
	let newBoard = [];
	for (i in board) {
		piecee = board[i];
		if (piecee === "init") {
			continue;
		}
		newBoard.push(pieceNotation[piecee]);
	}
	return newBoard;
}

function getFEN(board) {
	board = remixBoard(board);
	let fen = "";
	for (let rank = 7; 0 <= rank; rank--) {
		let emptySquares = 0;
		for (let file = 0; file <= 7; file++) {
			let p = board[rank * 8 + file];
			if (p === " ") {
				emptySquares++;
			} else {
				if (emptySquares) {
					fen += emptySquares.toString();
					emptySquares = 0;
				}
				fen += p;
			}
		}
		if (emptySquares) {
			fen += emptySquares.toString();
		}
		fen += "/";
	}

	alertCustom("fen copied to clipboard");
	navigator.clipboard.writeText(fen);
}

function make_board(fen) {
	let c_board = ["init"];
	let p;
	for (let i = 0; i < fen.length; i++) {
		p = fen[i];
		if (p === "/" || p === "init") {
			continue;
		} else {
			if ("123456789".includes(p)) {
				for (let j = 0; j < parseInt(p); j++) {
					c_board.push("   ");
				}
			} else {
				c_board.push(fen_pieces[p]);
			}
		}
	}
	return c_board;
}

// function check_win(board) {
// 	let won = false;
// 	if (!board.includes("w♔") && !board.includes(" W♔")) {
// 		alertCustom("black won by taking the king");
// 		won = true;
// 	} else if (!board.includes("b♔") && !board.includes(" B♔")) {
// 		alertCustom("white won by taking the king");
// 		won = true;
// 	}
// 	return won;
// }

function displayPices(board) {
	let square;
	let render;
	for (i in board) {
		square = board[i];
		render = document.getElementById(`B${i}`);
		if (square === "init") {
			continue;
		} else if (square === "   ") {
			render.innerText = "   ";
		} else {
			square = square.toLowerCase();
			render.innerText = "";
			render.innerHTML = pieceSVG[pieceNotation[square]];
		}
	}
}
let stackPlayer;
let movesCounter = 1;
function appendMove(move, player, option = "append") {
	if (option === "append") {
		if (player === "w") {
			stackPlayer = document.getElementById("WMoves");
			stackPlayer.innerHTML += `<p>${movesCounter + ".  " + move}</p>`;
			movesCounter++;
		} else {
			stackPlayer = document.getElementById("BMoves");
			stackPlayer.innerHTML += `<p>${move}</p>`;
		}
	} else {
		document.getElementById("BMoves").innerHTML = "<p>Black Moves</p>";
		document.getElementById("WMoves").innerHTML = "<p>White Moves</p>";
	}
}

function make_move(positionOld, positionNew, player, board) {
	let piece = board[movements[positionOld]];
	console.log(piece);
	let start_old = piece[1];
	let start_new = board[movements[positionNew]][0];
	if (piece !== "   " && start_old !== start_new) {
		board[movements[positionOld]] = "   ";
		board[movements[positionNew]] = piece
			.replace("B", "b")
			.replace("W", "w");
		let move = `${piece[0]}${piece[1]}${positionNew}`;
		moves.push(move);
		appendMove(move, player);
		switchPlayer(player);
		displayPices(board);
	} else if (piece === "   ") {
		alertCustom(`square ${positionOld} is empty`);
	} else if (start_old == start_new) {
		alertCustom(
			`[${
				start_new.includes("b") || start_new.includes("B")
					? "BLACK"
					: "WHITE"
			}] you can't attack your piece`
		);
	}
}
let oldClickedMove = "";
let newClickedMove = "";
function clickMove(move, position) {
	if (oldClickedMove === "") {
		if (board[movements[move]] !== "   ") {
			oldClickedMove = move;
		} else {
			alertCustom("Empty Square");
		}
	} else {
		newClickedMove = move;
		make_move(oldClickedMove, newClickedMove, PlayerTurn, board);
		oldClickedMove = "";
		newClickedMove = "";
	}
}

function alertCustom(message) {
	if (message === "remove") {
		alerter.textContent = "";
		alerter.style.zIndex = "-10";
	} else {
		alerter.style.zIndex = "10";
		alerter.textContent = message;
	}
}

function newGame() {
	board = make_board(games["start"]);
	appendMove(false, false, "clear");
	PlayerTurn = "w";
	movesCounter = 1;
	moves = [];
	counter = 1;
	oldClickedMove = "";
	newClickedMove = "";
	board = make_board(games["start"]);
	displayPices(board);
}

newGame();
