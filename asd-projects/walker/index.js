/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };
  // Game Item Objects
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  };
  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp); // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    } else if (event.which === KEY.UP) {
      walker.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
  }

  /* 
  Called in response to events.
  */
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
    } else if (event.which === KEY.UP) {
      walker.speedY = 0;
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 0;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.x);
    $("#walker").css("top", walker.y);
  }

  function wallCollision() {
    const WALLRIGHT = $("#board").width();
    const WALLBOTTOM = $("#board").height();
    const WALLTOP = 0;
    const WALLLEFT = 0;

    if (walker.x > WALLRIGHT - $("#walker").width() || walker.x < WALLLEFT) {
      walker.x -= walker.speedX;
    }
    if (walker.y > WALLBOTTOM - $("#walker").height() || walker.y < WALLTOP) {
      walker.y -= walker.speedY;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
