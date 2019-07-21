var numSquares = 3;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var displayedColor = document.getElementById("colorDisplayed");
var header = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var messageDisplayed = document.querySelector("#message");


init();

function init() {
	setupModeButton();
	setupSquares();
	reset();
}

resetButton.addEventListener("click", function() {
	reset();
});

function setupModeButton() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else if (this.textContent === "Medium") {
				numSquares = 6;
			} else if (this.textContent === "Hard") {
				numSquares = 9;
			}
			reset();
		});
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		// Game logic, check if player matches the expected color.
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplayed.textContent = "Correct!";
				// Change text on top to the correct color.
				header.style.backgroundColor = clickedColor;
				// Change all squares to the correct color.
				syncSquares(clickedColor);
				// Change button to asking if player wants to play again.
				resetButton.textContent = "Play again?"
			} else {
				// "Remove" square by changing it to page background color.
				this.style.backgroundColor = "#232323";
				messageDisplayed.textContent = "Wrong! Try again!";
			}
		})
	}
}

// Reset everything.
function reset() {
	// Generate 6 new random colors.
	colors = generateRandomColors(numSquares);
	// Pick a random color and display it.
	pickedColor = pickColor();
	// Change displayed color to match with picked color.
	displayedColor.textContent = pickedColor;
	// Change text on top to the correct color.
	header.style.backgroundColor = "steelblue";
	// Change button to let player generate new colors.
	resetButton.textContent = "New colors"
	// Change message displayed to the user.
	messageDisplayed.textContent = "";

	// Change colors of 3 squares and not displayed the rest.
	for (var i = 0; i < squares.length; i++) {
		// Initialize color for squares if color exists.
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else { // Don't display if color does not exists.
		squares[i].style.display = "none";
		}	
	}
}

// Change all squares to the correct picked color.
function syncSquares(color) {
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	} 
}

// Pick random color from the displayed set of colors.
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Generate N random colors.
function generateRandomColors(num) {
	var colors = [];
	for (var i = 0; i < num; i++) {
		colors.push(randomColor());
	}
	return colors;
}


// Create a random color.
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}