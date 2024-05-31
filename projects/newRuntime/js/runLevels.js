var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createObstacle(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var ballHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      ballHitZone.x = x;
      ballHitZone.y = groundY - y;
      
      var obstacleImage = draw.bitmap("img/plsea0.png");
      obstacleImage.x = -24;
      obstacleImage.y = -24;
      obstacleImage.scaleX = 2;
      obstacleImage.scaleY = 2;
      
      ballHitZone.addChild(obstacleImage);
      game.addGameItem(ballHitZone);
    }

    createObstacle(400, 32);
    createObstacle(800, 16);
    createObstacle(1600, 64);

    var enemy = game.createGameItem("enemy", 25);
    var skull = draw.bitmap("img/bosfa0.png");
    
    skull.x = -24;
    skull.y = -24;

    enemy.addChild(skull);
    enemy.x = 400;
    enemy.y = groundY - 48;
    enemy.velocityX = -1;
    enemy.onPlayerCollision = function () { game.changeIntegrity(-50) };
    enemy.onProjectileCollision = function () {
      game.increaseScore(100);
      enemy.shrink();
    } ;

    game.addGameItem(enemy);

    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
