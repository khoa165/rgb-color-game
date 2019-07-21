var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var displayedColor = document.getElementById("colorDisplayed");
displayedColor.textContent = pickedColor;

var reset = document.getElementById("reset");
reset.addEventListener("clicked", function() {

})

var messageDisplayed = document.querySelector("#message");

for (var i = 0; i < squares.length; i++) {
	// Initialize color for squares.
	squares[i].style.backgroundColor = colors[i];
	// Game logic, check if player matches the expected color.
	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor) {
			messageDisplayed.textContent = "Correct!";
			// Change text on top to the correct color.
			displayedColor.style.color = clickedColor;
			// Change all squares to the correct color.
			syncSquares(clickedColor);
		} else {
			// "Remove" square by changing it to page background color.
			this.style.backgroundColor = "#232323";
			messageDisplayed.textContent = "Wrong! Try again!";
		}
	})
}

function syncSquares(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	} 
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var colors = [];
	for (var i = 0; i < num; i++) {
		colors.push(randomColor());
	}
	return colors;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}