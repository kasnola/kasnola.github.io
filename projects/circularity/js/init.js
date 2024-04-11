/** @format */

var init = function (window) {
	"use strict";
	var draw = window.opspark.draw,
		physikz = window.opspark.racket.physikz,
		app = window.opspark.makeApp(),
		canvas = app.canvas,
		view = app.view,
		fps = draw.fps("#000");

	window.opspark.makeGame = function () {
		window.opspark.game = {};
		let game = window.opspark.game;

		////////////////////////////////////////////////////////////
		///////////////// PROGRAM SETUP ////////////////////////////
		////////////////////////////////////////////////////////////

		// TODO 1 : Declare and initialize our variables
		let circle;
		let circles = [];
		let speedX = 3;
		let speedY = 3;
		let circleDraws = 100;

		// TODO 2 : Create a function that draws a circle
		function drawCircle() {
			circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
			physikz.addRandomVelocity(circle, canvas, speedX, speedY);
			view.addChild(circle);
			circles.push(circle);
		}

		// TODO 3 / 7 : Call the drawCircle() function
		for (let i = 0; i < circleDraws; i++) {
			drawCircle();
		}

		////////////////////////////////////////////////////////////
		///////////////// PROGRAM LOGIC ////////////////////////////
		////////////////////////////////////////////////////////////

		/* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
		function update() {
			// TODO 4 : Update the circle's position //
			// commented out because it's hardcoded & violates DRY
				// physikz.updatePosition(circles[0]);
				// physikz.updatePosition(circles[1]);
				// physikz.updatePosition(circles[2]);
				// physikz.updatePosition(circles[3]);
				// physikz.updatePosition(circles[4]);
			// TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
			// ditto
				// game.checkCirclePosition(circles[0]);
				// game.checkCirclePosition(circles[1]);
				// game.checkCirclePosition(circles[2]);
				// game.checkCirclePosition(circles[3]);
				// game.checkCirclePosition(circles[4]);
			// TODO 9 : Iterate over the array
			for (let i = 0; i < circles.length; i++) {
				physikz.updatePosition(circles[i]);
				game.checkCirclePosition(circles[i]);
			}
		}

		/* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
		game.checkCirclePosition = function (circle) {
			// if (circle.x > canvas.width) {
			// 	circle.x = 0;
			// }
			// TODO 6 : YOUR CODE STARTS HERE //////////////////////

			let left = 0;
			let top = 0;
			let right = canvas.width;
			let bottom = canvas.height;

			if (circle.x < left - circle.radius) {
				circle.x = right + circle.radius;
			}

			if (circle.x > right + circle.radius) {
				circle.x = left - circle.radius
			}

			if (circle.y > bottom + circle.radius) {
				circle.y = top - circle.radius;
			}

			if (circle.y < top - circle.radius) {
				circle.y = bottom + circle.radius;
			}

			// YOUR TODO 6 CODE ENDS HERE //////////////////////////
		};

		/////////////////////////////////////////////////////////////
		// --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
		/////////////////////////////////////////////////////////////

		view.addChild(fps);
		app.addUpdateable(fps);

		game.circle = circle;
		game.circles = circles;
		game.drawCircle = drawCircle;
		game.update = update;

		app.addUpdateable(window.opspark.game);
	};
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
	typeof process !== "undefined" &&
	typeof process.versions.node !== "undefined"
) {
	// here, export any references you need for tests //
	module.exports = init;
}
