$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    // for (let i = 100; i < canvas.width; i += 100) {
    //   createPlatform(i, canvas.height, -1, -canvas.height);
    // }
    // for (let i = 100; i < canvas.height; i += 100) {
    //   createPlatform(canvas.width, i, -canvas.width, -1);
    // }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    createPlatform(0, 600, 200, 150);
    createPlatform(200, 600, 100, 20);
    createPlatform(400, 650, 50, 20); // tiny block
    createPlatform(550, 550, 50, 20);
    createPlatform(400, 400, 50, 20);
    createPlatform(200, 300, 50, 20);
    createPlatform(650, 450, 50, 20);
    createPlatform(200, 400, 100, 20);
    createPlatform(700, 200, 100, 600);
    createPlatform(700, 0, 100, 100);
    createPlatform(400, 200, 100, 20);
    createPlatform(100, 0, 100, 420);
    createPlatform(650, 200, 50, 20);
     // zone 2
    createPlatform(800, 500, 200, 10);
    createPlatform(800, 100-10, 200, 10);
    createPlatform(800, 300, 200, 10);
    createPlatform(1000, 200, 200, 10);
    createPlatform(800, 700, 400, 40);
    createPlatform(1000, 600, 200, 10);
    createPlatform(1000, 400, 200, 10);
    // end gate
    createPlatform(1200, 0, 100, 500);
    createPlatform(1200, 600, 100, 200);
    
    // the "catcher"
    // createPlatform(1400, 650, -80, 20); // interestingly, there is no collision with negative height/width platforms
    // createPlatform(1400-20, 650, 20, 150);

    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable("steve", 1400-100, 0, 0.0008, 0);
    createCollectable("max", 250, 175, 0.25, 0.2)
    createCollectable("diamond", 800, 0, 0.25, 0.2)
    createCollectable("database", 1150, 650, 0.25, 0.2)

    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon("left", 700, 120, 100, 100);
    createCannon("top", 700, 2500, 50, 50);
    createCannon("right", 700, 2000, 20, 20);

    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
