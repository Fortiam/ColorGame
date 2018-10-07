var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var whatMode = 6;
var colors = generateRandomColors(whatMode);
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
//event listeners here
reset.addEventListener("click", newGame);
easyBtn.addEventListener("click", easyMode);
hardBtn.addEventListener("click", hardMode);

function easyMode(){
	easy.classList.add("selected");
	hard.classList.remove("selected");
	whatMode = 3;
	for(var x = 3; x < squares.length; x++){
		squares[x].style.display= "none";
	}
	newGame();
};

function hardMode(){
	easy.classList.remove("selected");
	hard.classList.add("selected");
	whatMode = 6;
	for(var x = 3; x < squares.length; x++){
		squares[x].style.display= "block";
	}
	newGame();
}


function startSquares(){
	for(var i = 0; i<squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", funcky);
 	}
};

var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent= pickedColor;

function newGame(){
	//generate new colors
	colors= generateRandomColors(whatMode);
	//pick a new rando
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	//change colors
	changeColors(colors);
	startSquares();
	h1.style.backgroundColor = document.body.style.backgroundColor;
	reset.textContent = "NEW COLORS"
	messageDisplay.textContent ="";
}

function funcky(){
	var clickedColor = this.style.backgroundColor;
	if (clickedColor === pickedColor){
		messageDisplay.textContent="You Win!";
		changeColors(clickedColor);
		h1.style.backgroundColor = clickedColor;
		reset.textContent = "Play Again?"
	}
	else {
		messageDisplay.textContent= "Wrong!";
		this.style.backgroundColor = document.body.style.backgroundColor;
	}
}

function changeColors(color){
	for(var i = 0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
};
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
function generateRandomColors(num) {
	var arr = [];
	for(var i = 0; i < num; i++){
		arr.push(randomColor())
	};
	return arr;
};

function randomColor(){
	var r =  Math.floor(Math.random() * 256);
	var g =  Math.floor(Math.random() * 256);
	var b =  Math.floor(Math.random() * 256);
	return "rgb("+ r+", "+g+", "+ b+")";
};

startSquares();