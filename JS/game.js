let alerter = document.getElementById("alert");
let board;
let PlayerTurn = "w";
let moves = [];


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
	board = remixBoard(board)
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
	for (let i = 0; i<fen.length; i++) {
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

function make_move(position_old, position_new, p, board) {
	let piece = board[movements[position_old]];
	let start_old = piece[1];
	let start_new = board[movements[position_new]][0];
	if (piece !== "   " && start_old !== start_new) {
		board[movements[position_old]] = "   ";
		board[movements[position_new]] = piece
			.replace("B", "b")
			.replace("W", "w");
		let move = `${piece[1]}${piece[2]}${position_new}`;
		moves.push(move);
		displayPices(board);
		//switchPlayer(p);
	} else if (piece === "   ") {
		alertCustom(`square ${position_old} is empty`);
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

// function switchPlayer(current) {
// 	const turn = document.querySelector("#player");
// 	if (current === "w") {
// 		turn.innerHTML = `
//         <h1 id="black">Black's Move</h1>
//         <h2>old <input type="text" class="move" id="old" placeholder="a7"/></h2>
//         <h2>new <input type="text" class="move" id="new" placeholder="a6"/></h2>
//         <button class="mkMove" onclick="MkMove('b')">Move</button>`;
// 		PlayerTurn = "b";
// 	} else {
// 		turn.innerHTML = `
//         <h1 id="white">White's Move</h1>
//         <h2>old <input type="text" class="move" id="old" placeholder="a2"/></h2>
//         <h2>new <input type="text" class="move" id="new" placeholder="a4"/></h2>
//         <button class="mkMove" onclick="MkMove('w')">Move</button>`;
// 		PlayerTurn = "w";
// 	}
// }

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
	PlayerTurn = "w";
	moves = [];
	counter = 1;
	oldClickedMove = "";
	newClickedMove = "";
	board = make_board(games["start"]);
	displayPices(board);
}