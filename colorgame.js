'use strict';
// declare variables and DOM references

let squares = document.querySelectorAll(".square");
let messageDisplay = document.querySelector("#message");
let whatMode = 9;  //starts at value for hard difficulty
let colors = generateRandomColors(whatMode);
let h1 = document.querySelector("h1");
let reset = document.querySelector("#reset");
let easyBtn = document.querySelector("#easy");
let normalBtn = document.querySelector("#normal");
let hardBtn = document.querySelector("#hard");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");

//event listeners here
reset.addEventListener("click", newGame);
easyBtn.addEventListener("click", easyMode);
normalBtn.addEventListener("click", normalMode);
hardBtn.addEventListener("click", hardMode);

// calling difficulty functions highlights that difficulty's button with class="selected"
// sets the difficulty mode variable to determine how many squares to render.
// loops through some of the squares and sets their display property
// calls new game function to make new colors.

function easyMode(){
	easyBtn.classList.add("selected");
	normalBtn.classList.remove("selected");
	hardBtn.classList.remove("selected");
	whatMode = 3;  
	for(let x = 3; x < squares.length; x++){
		squares[x].style.display= "none";
	}
	newGame();
}

function normalMode(){
	easyBtn.classList.remove("selected");
	normalBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	whatMode = 6; 
	for(let addem = 0; addem < 6; addem++){
		squares[addem].style.display="block";
	}
	for(let x = 6; x < squares.length; x++){
		squares[x].style.display= "none";
	}
	newGame();
}

function hardMode(){
	easyBtn.classList.remove("selected");
	normalBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	whatMode = 9;
	for(let x = 3; x < squares.length; x++){
		squares[x].style.display= "block";
	}
	newGame();
}

// makes each of the squares clickable, and sets background color stored in array 'colors'
function startSquares(){
	for(let i = 0; i<squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", squareClicked);
    }
}

function newGame() {
	//generate new colors
	colors = generateRandomColors(whatMode);
	//pick a new random winning color
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	changeColors(colors);
	// inits the squares
	startSquares();
	h1.style.backgroundColor = document.body.style.backgroundColor;
	// reset message to say new colors instead of play again? after game over
	reset.textContent = "NEW COLORS";
	messageDisplay.textContent ="";
}

// each square has this function tied to its' event listener
// checks if this square matches the winner
function squareClicked() {
	let clickedColor = this.style.backgroundColor;
	if (clickedColor === pickedColor){
		messageDisplay.textContent="You Win!";
		changeColors(clickedColor);
		h1.style.backgroundColor = clickedColor;
		reset.textContent = "Play Again?";
	}
	else {
		messageDisplay.textContent= "Wrong!";
		this.style.backgroundColor = document.body.style.backgroundColor;
	}
}

// loop through all the squares and change their color to passed in parameter
function changeColors(color) {
	for(let i = 0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

// select a winning color from the pool of colors in the array 'colors'
function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// num is whatMode, 3,6, or 9. which makes an array sized based on difficulty.
function generateRandomColors(num) {
	let arr = [];
	for(let i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

// gets called on generating the colors array, to make each value in the array match a 'rgb(255,255,255)' string.
function randomColor() {
	let r =  Math.floor(Math.random() * 256);
	let g =  Math.floor(Math.random() * 256);
	let b =  Math.floor(Math.random() * 256);
	return "rgb("+ r+", "+g+", "+ b+")";
}

newGame();