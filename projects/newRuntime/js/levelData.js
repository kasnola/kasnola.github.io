var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Rumble",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "enemy", x: 400, y: 48 },
          { type: "obstacle", x: 600, y: 48 },
          { type: "enemy", x: 700, y: 48 },
          { type: "enemy", x: 800, y: 48 },
          { type: "reward", x: 900, y: 48 },
          { type: "enemy", x: 1100, y: 48 },
          { type: "obstacle", x: 1200, y: 48 },
          { type: "obstacle", x: 500, y: 48 },
          { type: "obstacle", x: 1000, y: 48 },
          { type: "obstacle", x: 900, y: 48 },
          { type: "marker", x: 1500, y: 0 },
        ],
      },
      {
        name: "Robot Light District",
        number: 2,
        speed: -6,
        gameItems: [
          { type: "enemy", x: 2100, y: 48 },
          { type: "enemy", x: 2110, y: 48 },
          { type: "enemy", x: 2120, y: 32 },
          { type: "enemy", x: 2130, y: 48 },
          { type: "enemy", x: 2140, y: 48 },
          { type: "enemy", x: 2150, y: 48 },
          { type: "enemy", x: 2160, y: 32 },
          { type: "enemy", x: 2170, y: 48 },
          { type: "enemy", x: 2180, y: 16 },
          { type: "enemy", x: 2190, y: 48 },
          { type: "enemy", x: 2200, y: 48 },
          { type: "enemy", x: 2210, y: 64 },
          { type: "enemy", x: 2220, y: 48 },
          { type: "enemy", x: 2230, y: 128 },
          { type: "enemy", x: 2240, y: 48 },
          { type: "enemy", x: 2250, y: 8 },
          { type: "enemy", x: 2260, y: 48 },
          { type: "enemy", x: 2270, y: 48 },
          { type: "enemy", x: 2280, y: 48 },
          { type: "enemy", x: 2290, y: 48 },
          { type: "reward", x: 1500, y: 48 },
          { type: "obstacle", x: 2600, y: 96 },
          { type: "obstacle", x: 2610, y: 128 },
          { type: "obstacle", x: 2620, y: 128 },
          { type: "obstacle", x: 2630, y: 128 },
          { type: "marker", x: 2800, y: 48 },
        ],
      },
      {
        name: "bsp (the file format)",
        number: 3,
        speed: -9,
        gameItems: [
          { type: "reward", x: 3500, y: 48 },
          { type: "enemy", x: 3500, y: 48 },
          { type: "obstacle", x: 3500, y: 48 },
          { type: "reward", x: 3600, y: 48 },
          { type: "enemy", x: 3600, y: 48 },
          { type: "obstacle", x: 3600, y: 48 },
          { type: "reward", x: 3700, y: 48 },
          { type: "enemy", x: 3700, y: 48 },
          { type: "marker", x: 3800, y: 48 },
        ]
      }
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
