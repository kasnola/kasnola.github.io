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
	let leftPaddle = GameItem("#leftPaddle", 0, 0);
	let rightPaddle = GameItem("#rightPaddle", 0, 0);
	let ball = GameItem("#ball", 2, 2);
	let leftScore = GameItem("#leftScore", undefined, undefined);
	let rightScore = GameItem("#rightScore", undefined, undefined);

	// one-time setup
	let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
	$(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
	$(document).on("keyup", handleKeyUp); // change 'eventType' to the type of event you want to handle
	$("button").on("click", handleButtonClick);
	ball.circle = true;
	leftScore.no = 0;
	rightScore.no = 0;
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
		handleCollision(leftPaddle);
		redrawGameItem(leftPaddle);
		repositionGameItem(rightPaddle);
		handleCollision(rightPaddle);
		redrawGameItem(rightPaddle);
		repositionGameItem(ball);
		handleCollision(ball);
		redrawGameItem(ball);
		winCondition();
	}

	function handleButtonClick(event) {
		if (ball.circle === true) {
			$("#ball").css("border-radius", "0px");
			ball.circle = false;
		} else if (ball.circle === false) {
			$("#ball").css("border-radius", "10px");
			ball.circle = true;
		}
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

	function handleCollision(gameItem) {
		const COLLIDED = {
			RIGHT: gameItem.x > WALL.RIGHT - gameItem.$.width(),
			LEFT: gameItem.x < WALL.LEFT,
			BOTTOM: gameItem.y > WALL.BOTTOM - gameItem.$.height(),
			TOP: gameItem.y < WALL.TOP,
		};

		if (COLLIDED.RIGHT || COLLIDED.LEFT) {
			gameItem.x -= gameItem.speedX;
		}

		if (COLLIDED.RIGHT && gameItem === ball) {
			ballCollision("right");
		} else if (COLLIDED.LEFT && gameItem === ball) {
			ballCollision("left");
		} else if (COLLIDED.TOP && gameItem === ball) {
			ballCollision("top");
		} else if (COLLIDED.BOTTOM && gameItem === ball) {
			ballCollision("bottom");
		}

		if ((COLLIDED.BOTTOM || COLLIDED.TOP) && !(gameItem === ball)) {
			gameItem.y -= gameItem.speedY;
		}

		if (doCollide(ball, leftPaddle) || doCollide(ball, rightPaddle)) {
			ball.speedX = -ball.speedX;
		}
	}

	function startBall() {
		let randomNum =
			(Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
		ball.x = 220;
		ball.y = 220;
		ball.speedX = randomNum;
		ball.speedY = randomNum;
	}

	function ballCollision(wall) {
		if (wall === "right") {
			leftScore.no += 1;
			leftScore.$.text(`SCORE: ${leftScore.no}`);
			startBall();
		}

		if (wall === "left") {
			rightScore.no += 1;
			rightScore.$.text(`SCORE: ${rightScore.no}`);
			startBall();
		}

		if (wall === "top" || wall === "bottom") {
			ball.speedY = -ball.speedY;
		}
	}

	function doCollide(obj1, obj2) {
		obj1.left = obj1.x;
		obj1.top = obj1.y;
		obj1.right = obj1.x + obj1.width;
		obj1.bottom = obj1.y + obj1.height;

		obj2.left = obj2.x;
		obj2.top = obj2.y;
		obj2.right = obj2.x + obj2.width;
		obj2.bottom = obj2.y + obj2.height;

		if (
			obj1.left < obj2.right &&
			obj1.right > obj2.left &&
			obj1.top < obj2.bottom &&
			obj1.bottom > obj2.top
		) {
			return true;
		} else {
			return false;
		}
	}

	function winCondition() {
		if (leftScore.no >= 10) {
			endGame("red");
		}
		if (rightScore.no >= 10) {
			endGame("blue");
		}
	}

	function endGame(winner) {
		// stop the interval timer
		clearInterval(interval);

		// turn off event handlers
		$(document).off();

		// display a winner :-)
		if (winner === "red") {
			$("#leftScore").text("WINNER");
			$("#rightScore").remove();
		} else if (winner === "blue") {
			$("#rightScore").text("WINNER");
			$("#leftScore").remove();
		}
	}
}
