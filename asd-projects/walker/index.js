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
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  };
  const WALLRIGHT = $("#board").width();
  const WALLBOTTOM = $("#board").height();
  const WALLTOP = 0;
  const WALLLEFT = 0;
  // Game Item Objects
  let walker1 = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    accel: 1,
    $: $("#walker1"),
    width: 50,
    height: 50,
  };
  let walker2 = {
    x: 390,
    y: 390,
    speedX: 0,
    speedY: 0,
    accel: 1,
    $: $("#walker2"),
    width: 50,
    height: 50,
  };
  let gameOn = false;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp); // change 'eventType' to the type of event you want to handle
  $(".walker").on("click", handleWalkerClick); // change colors on click

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // debugger;
    // right now the movement is 'stuttery' and i have a feeling it's because
    // of the order of the function calls... maybe it'd be fixed by
    // iterating over an array instead?
    repositionGameItem(walker1);
    wallCollision(walker1);
    redrawGameItem(walker1);
    repositionGameItem(walker2);
    wallCollision(walker2);
    redrawGameItem(walker2);
    walkerCollision(walker1, walker2);
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker1.speedX = -5;
    } else if (event.which === KEY.UP) {
      walker1.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      walker1.speedY = 5;
    } else if (event.which === KEY.RIGHT) {
      walker1.speedX = 5;
    } else if (event.which === KEY.W) {
      walker2.speedY = -5;
    } else if (event.which === KEY.A) {
      walker2.speedX = -5;
    } else if (event.which === KEY.S) {
      walker2.speedY = 5;
    } else if (event.which === KEY.D) {
      walker2.speedX = 5;
    }
  }

  /* 
  Called in response to events.
  */
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      walker1.speedX = 0;
    } else if (event.which === KEY.UP) {
      walker1.speedY = 0;
    } else if (event.which === KEY.DOWN) {
      walker1.speedY = 0;
    } else if (event.which === KEY.RIGHT) {
      walker1.speedX = 0;
    } else if (event.which === KEY.W) {
      walker2.speedY = 0;
    } else if (event.which === KEY.A) {
      walker2.speedX = 0;
    } else if (event.which === KEY.S) {
      walker2.speedY = 0;
    } else if (event.which === KEY.D) {
      walker2.speedX = 0;
    }
  }

  function handleWalkerClick(event) {
    let randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    $(this).css("background-color", randomColor);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(walker) {
    walker.x += walker.speedX * walker.accel;
    walker.y += walker.speedY * walker.accel;
  }

  function redrawGameItem(walker) {
    walker.$.css("left", walker.x);
    walker.$.css("top", walker.y);
  }

  function wallCollision(walker) {
    if (walker.x > WALLRIGHT - walker.$.width() || walker.x < WALLLEFT) {
      walker.x -= walker.speedX * walker.accel;
    }
    if (walker.y > WALLBOTTOM - walker.$.height() || walker.y < WALLTOP) {
      walker.y -= walker.speedY * walker.accel;
    }
  }

  function walkerCollision(walker1, walker2) {
    // if first run then initialize the tag game when they collide by making a random player red & moving each back to opposite corners
    // let's also keep track of who's it
    walker1.left = walker1.x;
    walker1.top = walker1.y;
    walker1.right = walker1.x + walker1.width;
    walker1.bottom = walker1.y + walker1.height;

    walker2.left = walker2.x;
    walker2.top = walker2.y;
    walker2.right = walker2.x + walker2.width;
    walker2.bottom = walker2.y + walker2.height;
    function resetPos(walker1, walker2){
      walker2.x = 0;
      walker2.y = 0;
      walker1.x = WALLRIGHT - walker1.$.width();
      walker1.y = WALLBOTTOM - walker1.$.width();
    }
    let colliding =
      walker1.left < walker2.right &&
      walker1.right > walker2.left &&
      walker1.top < walker2.bottom &&
      walker1.bottom > walker2.top;
    // debugger;
    let walkerIt = Math.random() > 0.5 ? walker1 : walker2;
    if (colliding && !gameOn) {
      // console.log("colliding! game is not on");
      walkerIt.$.css("background-color", "red");
      walkerIt.accel = 0.5;
      resetPos(walker1, walker2);
      gameOn = true;
    } else if (colliding && gameOn) {
      console.log("colliding! game is on");
      walkerIt.$.css("background-color", "blue");
      resetPos(walker1, walker2);

      walkerIt = walkerIt === walker1 ? walker2 : walker1
      walkerIt.$.css("background-color", "red");
      walkerIt.accel = 0.8;
    } else {
      console.log("nocolliding");
    }
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
