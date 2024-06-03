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

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var skull = draw.bitmap("img/bosfa0.png");
      
      enemy.addChild(skull);
      enemy.x = x;
      enemy.y = groundY - y;
      enemy.velocityX = -1;
      enemy.onPlayerCollision = function () { game.changeIntegrity(-20) };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.shrink();
      } ;
      
      skull.x = -24;
      skull.y = -24;
      
      game.addGameItem(enemy);
    }
    
    function createReward(x, y) {
      var reward = game.createGameItem("reward", 36); // intentional
      var orb = draw.bitmap("img/pinva0.png");
      
      reward.addChild(orb);
      reward.x = x;
      reward.y = groundY - y;
      reward.velocityX = -1;
      reward.onPlayerCollision = function () { game.changeIntegrity(50) };
      
      orb.x = -20;
      orb.scaleX = 1.5;
      orb.y = -20;
      orb.scaleY = 1.5;
      
      game.addGameItem(reward);
    }
    
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]
      var levelObjects = level.gameItems
      
      for (let i = 0; i < levelObjects.length; i++) {
        let obj = levelObjects[i];
        if (obj.type === "obstacle") {
          createObstacle(obj.x, obj.y);
        }
        else if (obj.type === "enemy") {
          createEnemy(obj.x, obj.y);
        }
        else if (obj.type === "reward") {
          createReward(obj.x, obj.y);
        }
        else if (obj.type === "marker") {
          createMarker(obj.x, obj.y);
        }
      }
      
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

    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 64);
      var exit = draw.bitmap("img/lfall3.png");
    
      marker.addChild(exit);
      marker.x = x;
      marker.y = groundY - 32;
      marker.velocityX = -1;
      marker.onPlayerCollision = function () { startLevel() };
      marker.onProjectileCollision = function () { startLevel() };
    
      exit.x = -64;
      exit.scaleX = 1;
      exit.y = -128;
      exit.scaleY = 1.5;

      game.addGameItem(marker);
    }
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
