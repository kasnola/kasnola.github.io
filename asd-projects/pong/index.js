/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
	////////////////////////////////////////////////////////////////////////////////
	//////////////////////////// SETUP /////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	// Constant Variables
	const FRAME_RATE = 60;
	const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
	const KEY = {
		ENTER: 13,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		W: 87,
		A: 65,
		S: 83,
		D: 68,
	};
	const WALL = {
		RIGHT: $("#board").width(),
		BOTTOM: $("#board").height(),
		TOP: 0,
		LEFT: 0,
	};
	const BOARD_WIDTH = WALL.RIGHT;
	const BOARD_HEIGHT = WALL.BOTTOM;

	// Game Item Objects
	let leftPaddle = GameItem("#leftPaddle", undefined, 0);
	let rightPaddle = GameItem("#rightPaddle", undefined, 0);
	let ball = GameItem("#ball", 2, 2);

	// one-time setup
	let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
	$(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
	$(document).on("keyup", handleKeyUp); // change 'eventType' to the type of event you want to handle
	startBall();

	function GameItem(id, speedX, speedY) {
		let gameItemInstance = {
			id: id,
			x: parseFloat($(id).css("left")),
			y: parseFloat($(id).css("top")),
			$: $(`${id}`),
			speedX: speedX,
			speedY: speedY,
			width: $(id).width(),
			height: $(id).height(),
		};
		return gameItemInstance;
	}

	////////////////////////////////////////////////////////////////////////////////
	///////////////////////// CORE LOGIC ///////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	/* 
	On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
	by calling this function and executing the code inside.
	*/
	function newFrame() {
		repositionGameItem(leftPaddle);
		wallCollision(leftPaddle);
		redrawGameItem(leftPaddle);
		repositionGameItem(rightPaddle);
		wallCollision(rightPaddle);
		redrawGameItem(rightPaddle);
		repositionGameItem(ball);
		wallCollision(ball);
		redrawGameItem(ball);
	}

	function handleKeyDown(event) {
		if (event.which === KEY.UP) {
			rightPaddle.speedY = -5;
		} else if (event.which === KEY.DOWN) {
			rightPaddle.speedY = 5;
		} else if (event.which === KEY.W) {
			leftPaddle.speedY = -5;
		} else if (event.which === KEY.S) {
			leftPaddle.speedY = 5;
		}
	}

	function handleKeyUp(event) {
		if (event.which === KEY.UP || event.which === KEY.DOWN) {
			rightPaddle.speedY = 0;
		} else if (event.which === KEY.W || event.which === KEY.S) {
			leftPaddle.speedY = 0;
		}
	}

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	function repositionGameItem(gameItem) {
		gameItem.x += gameItem.speedX;
		gameItem.y += gameItem.speedY;
	}

	function redrawGameItem(gameItem) {
		gameItem.$.css("left", gameItem.x);
		gameItem.$.css("top", gameItem.y);
	}

	function wallCollision(gameItem) {
		if (gameItem.x > WALL.RIGHT - gameItem.$.width() || gameItem.x < WALL.LEFT) {
			gameItem.x -= gameItem.speedX;
		}
		if (gameItem.y > WALL.BOTTOM - gameItem.$.height() || gameItem.y < WALL.TOP) {
			gameItem.y -= gameItem.speedY;
		}
	}

	function startBall() {
		let randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
		ball.x = 220;
		ball.y = 220;
		ball.speedX = randomNum;
		ball.speedY = randomNum;
	}

	function ballCollision(gameItem) {
		// TODO
	}

	function endGame() {
		// stop the interval timer
		clearInterval(interval);

		// turn off event handlers
		$(document).off();
	}
}
