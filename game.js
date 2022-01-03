//! REMEMBER to remove the old way of moving
//! i mean the user board

let alerter = document.getElementById("alert");
let board;
let PlayerTurn = "w";
let moves = [];

let boardEl = document.getElementById("board");
let settingsButton = document.querySelector(".settings");
let settingsArea = document.querySelector(".settings-pop");
let closeSettings = document.querySelector(".close");
settingsButton.addEventListener("click", () => {
	settingsArea.style.transform = "translateX(0)";
	settingsArea.style.width = "30%";
});

function closeSettingsButtons() {
	settingsArea.style.transform = "translateX(20vw)";
	settingsArea.style.width = "15vw";
}

closeSettings.addEventListener("click", closeSettingsButtons());

// function getFEN() {
// 	alertCustom("fen copied to clipboard");
// 	navigator.clipboard.writeText(board_to_fen(board));
// }

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

function getFEN2(boardRemixed) {
	let ret;
	let cnt = 0; // counter for successive empty cell along the row
	let save = []; // temp container

	for (a in boardRemixed) {
		index = parseInt(a)
		v = boardRemixed[index];
		if (v === " ") {
			cnt += 1;
			// sum up the successive empty cell and update save
			if (cnt > 1) {
				save[save.length - 1] = cnt.toString();
			} else if (cnt < 1) {
				save.push(cnt.toString()); // add
			}
		} else if (v !== " ") {
			save.push(v); // add
			cnt = 0; // reset, there is no successive number
		}
		
		
		if ((index + 1) % 8 === 0) {
			save.push("/");
			
			cnt = 0;
		}
	}
	ret = save.join(""); // convert list to string
	return ret
}
function getFEN(boardRemixed) {
	let empty = 0;
	let counter = 0;
	let fen = "";
	let i;
	for (p in boardRemixed) {
		i = boardRemixed[p];
		if (i === " ") {
			empty += 1;
		} else {
			if (empty > 0) {
				fen += empty.toString();
				fen += i;
				empty = 0;
			} else {
				fen += i;
			}
		}
		counter += 1;
		if (counter === 8) {
			fen += "/";
			counter = 1;
		}
	}

	alertCustom("fen copied to clipboard");
	navigator.clipboard.writeText(fen);
	return fen;
}

function make_board(fen) {
	let c_board = ["init"];
	let fenIn = fen.split("");
	let p;
	for (i in fenIn) {
		p = fenIn[i];
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
	let start_new = board[movements[position_new]][1];
	if (piece !== "   " && start_old !== start_new) {
		board[movements[position_old]] = "   ";
		board[movements[position_new]] = piece
			.replace("B", "b")
			.replace("W", "w");
		let move = `${piece[1]}${piece[2]}${position_new}`;
		moves.push(move);
		displayPices(board);
		switchPlayer(p);
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

function switchPlayer(current) {
	const turn = document.querySelector("#player");
	if (current === "w") {
		turn.innerHTML = `
        <h1 id="black">Black's Move</h1>
        <h2>old <input type="text" class="move" id="old" placeholder="a7"/></h2>
        <h2>new <input type="text" class="move" id="new" placeholder="a6"/></h2>
        <button class="mkMove" onclick="MkMove('b')">Move</button>`;
		PlayerTurn = "b";
	} else {
		turn.innerHTML = `
        <h1 id="white">White's Move</h1>
        <h2>old <input type="text" class="move" id="old" placeholder="a2"/></h2>
        <h2>new <input type="text" class="move" id="new" placeholder="a4"/></h2>
        <button class="mkMove" onclick="MkMove('w')">Move</button>`;
		PlayerTurn = "w";
	}
}
function MkMove(player) {
	let oldM = document.getElementById("old");
	let newM = document.getElementById("new");
	oldMV = oldM.value.toLowerCase();
	newMV = newM.value.toLowerCase();
	make_move(oldMV, newMV, player, board);
}

let oldClickedMove = "";
let newClickedMove = "";
function clickMove(move) {
	if (oldClickedMove === "") {
		if (board[movements[move]] !== "   ") {
			let oldMMM = document.getElementById("old");
			oldMMM.value = move;
			oldClickedMove = move;
		} else {
			alertCustom("Empty Square");
		}
	} else {
		let newMMM = document.getElementById("new");
		newMMM.value = move;
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
board = make_board(games["start"]);
displayPices(board);

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
