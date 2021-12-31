let alerter = document.getElementById("alert");

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

function check_win(board) {
	let won = false;
	if (
		!board.includes(" w♔") &&
		!board.includes(" W♔") &&
		!board.includes("*w♔") &&
		!board.includes("*W♔")
	) {
		alertCustom("black won by taking the king");
		won = true;
	} else if (
		!board.includes(" b♔") &&
		!board.includes(" B♔") &&
		!board.includes("*b♔") &&
		!board.includes("*b♔")
	) {
		alertCustom("white won by taking the king");
		won = true;
	}
	return won;
}

function display(board) {
	for (let i = 1; i < 65; i++) {
		document.getElementById(`B${i}`).innerText = board[i];
	}
}

board = make_board(games["start"]);

let PlayerTurn = "w";
let moves = [];
let counter = 1;
function clear_board(board) {
	for (i in board) {
		piece = board[i];
		if (piece === "init") {
			continue;
		}
		if (board[i] === "***") {
			board[i] = "   ";
		}
		if (board[i].split("").includes("*")) {
			board[i] = board[i].replace("*", " ");
		}
	}
}
function make_move(position_old, position_new, p, board) {
	let piece = board[movements[position_old]];
	let start_old = piece[1];
	let start_new = board[movements[position_new]][1];
	if (piece !== "   " && piece !== "***" && start_old !== start_new) {
		board[movements[position_old]] = "***";
		board[movements[position_new]] = piece
			.replace(" ", "*")
			.replace("B", "b")
			.replace("W", "w");
		counter++;
		let move = `${piece[1]}${piece[2]}${position_new}`;
		moves.push(move);
		if (counter > 10) {
			alert("صمم الموقع: عبدالرحمن عزمي");
			counter = -10;
		}
		display(board);
		clear_board(board);
		switchPlayer(p);
	} else if (piece in ["   ", "***"]) {
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
display(board);

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
		if (
			board[movements[move]] !== "   " &&
			board[movements[move]] !== "***"
		) {
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
