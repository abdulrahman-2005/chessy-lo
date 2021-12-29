let alerter = document.getElementById("alert")

function display(board) {
	for (let i = 1; i < 65; i++) {
		document.getElementById(`B${i}`).innerText = board[i];
	}
}

let PlayerTurn = "w";
let moves = [];
function clear_board(board = board) {
	for (piece in board) {
		if (piece === "init") {
			continue;
		}
		i = board.indexOf(piece) + 1;
		if (board[i].includes("*")) {
			board[i] = board[i].replace("*", " ");
		}
		if (board[i].includes("***")) {
			board[i] = board[i].replace("***", "   ");
		}
		if (
			piece[1] === "P" &&
			piece[0] in ["w", "W"] &&
			i in [64, 63, 62, 61, 60, 59, 58, 57]
		) {
			board[i] = "*wQ";
		}
		if (
			piece[1] === "P" &&
			piece[0] in ["b", "B"] &&
			i in [1, 2, 3, 4, 5, 6, 7, 8, 9]
		) {
			board[i] = "*bQ";
		}
	}
}
function make_move(position_old, position_new, p, board, debth = 3) {
	clear_board(board);
	let piece = board[movements[position_old]];
	let start_old = piece[1];
	let start_new = board[movements[position_new]][1];
	if (piece !== "   " && piece !== "***" && start_old !== start_new) {
		board[movements[position_old]] = "***";
		board[movements[position_new]] = piece
			.replace(" ", "*")
			.replace("B", "b")
			.replace("W", "w");

		let move = `${piece[1]}${piece[2]}${position_new}`;
		moves.push(move);
		switchPlayer(p);
	} else if (piece in ["   ", "***"]) {
		alertCustom(`square ${position_old} is empty`);
	} else if (start_old == start_new) {
		alertCustom(
			`[${
				start_new.includes("b") || start_new.includes("B") ? "BLACK" : "WHITE"
			}] you can't attack your piece`
		);
	}
	display(board);
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
            alertCustom("Empty Square")
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
        alerter.textContent = ""
        alerter.style.zIndex = "-10"
    } else {
        alerter.style.zIndex = "10"
        alerter.textContent = message
    }
}