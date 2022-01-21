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

function create() {
	let userFen = prompt("type your fen here")
	board = make_board(userFen)
	displayPices(board)
}